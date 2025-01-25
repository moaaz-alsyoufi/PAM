import React, { useState, useEffect } from "react";
import { useAuthContext } from "@/states/auth";
import apiRequest from "@/services/api/api";

interface StockOutDialogProps {
  dialogRef: React.RefObject<HTMLDialogElement | null>;
  dialogType: "Add" | "Edit" | "Preview" | "Select";
  current: any;
  handleHide: () => void;
  onSuccess: () => void;  // call parent to refresh or handle success
}

const StockOutDialog: React.FC<StockOutDialogProps> = ({
  dialogRef,
  dialogType,
  current,
  handleHide,
  onSuccess,
}) => {
  const { authState } = useAuthContext();
  const { user } = authState;
  const token = user?.token || "";
  const userId = user?.id || 0;
  const siteCode = user?.siteCode || "SITE";

  // Mimic your .cshtml states
  const [refNo, setRefNo] = useState("");
  const [outNo, setOutNo] = useState("");
  const [outDate, setOutDate] = useState("");
  const [outStockNotePrefix, setOutStockNotePrefix] = useState("");
  const [outStockNoteSuffix, setOutStockNoteSuffix] = useState("");
  const [selectedItem, setSelectedItem] = useState("");
  const [unit, setUnit] = useState("");
  const [availableQty, setAvailableQty] = useState("");
  const [outQty, setOutQty] = useState("");
  const [outStockTo, setOutStockTo] = useState("");
  const [subcontractor, setSubcontractor] = useState("");
  const [contractNumber, setContractNumber] = useState("");
  const [destinationSite, setDestinationSite] = useState("");
  const [remarks, setRemarks] = useState("");

  // Example lists you'd fetch from server
  const [items, setItems] = useState<any[]>([]);
  const [subcontractors, setSubcontractors] = useState<any[]>([]);
  const [otherSites, setOtherSites] = useState<any[]>([]);

  useEffect(() => {
    // On open, if "Add", reset fields or set defaults
    if (dialogType === "Add") {
      setRefNo("BS-SITE01-0005");
      setOutNo("OUT123");
      // default to today's date
      setOutDate(new Date().toISOString().split("T")[0]);
      // prefix from session e.g. "SITE-<userId>"
      setOutStockNotePrefix(`${siteCode}-${userId}`);
      setOutStockNoteSuffix("0005"); // or blank
      setSelectedItem("");
      setUnit("");
      setAvailableQty("");
      setOutQty("");
      setOutStockTo("");
      setSubcontractor("");
      setContractNumber("");
      setDestinationSite("");
      setRemarks("");
      // Optionally load your items, sub list, etc.
      fetchInitialData();
    }
    else if (dialogType === "Edit" && current) {
      // Pre-fill from "current" row data
      setRefNo(current.refNo || "");
      setOutNo(current.outNo || "");
      setOutDate(current.date || new Date().toISOString().split("T")[0]);
      // Suppose "SITE-UserID" is splitted in the record
      setOutStockNotePrefix("SITE-123");
      setOutStockNoteSuffix("0009");
      setSelectedItem(current.itemId || "");
      setUnit(current.itemUnit || "");
      setAvailableQty(current.availableQty || "");
      setOutQty(current.quantity || "");
      setOutStockTo(current.search || "");
      setSubcontractor(current.subId || "");
      setContractNumber(current.contractNumber || "");
      setDestinationSite(current.toSiteId || "");
      setRemarks(current.remarks || "");
      fetchInitialData();
    }
  }, [dialogType, current]);

  // Load items, subcontractors, etc. as needed
  const fetchInitialData = async () => {
    try {
      // Example: get items
      const itemsRes = await apiRequest("Stock/items", "GET", token);
      setItems(itemsRes || []);
      // Example: get subcontractors
      const subRes = await apiRequest("Stock/subcontractors", "GET", token);
      setSubcontractors(subRes || []);
      // Possibly load other sites
      const sitesRes = await apiRequest("Stock/PopulateSitesForOtherSite", "GET", token);
      setOtherSites(sitesRes?.data || []);
      // ... etc.
    } catch (error) {
      console.error("Error fetching initial data:", error);
    }
  };

  const handleConfirm = async () => {
    // Construct final note
    const outStockNote = `${outStockNotePrefix.trim()}-${outStockNoteSuffix.trim()}`;

    if (!selectedItem || !outQty || !outDate || !outStockTo || !outStockNote) {
      alert("Please fill in the required fields (Item, Out Qty, Date, OutStockTo, Note).");
      return;
    }

    // Additional checks similar to your jQuery code
    const qtyNum = parseFloat(outQty);
    const availNum = parseFloat(availableQty) || 0;
    if (qtyNum <= 0) {
      alert("Qty must be > 0");
      return;
    }
    if (qtyNum > availNum) {
      alert(`Qty cannot exceed available: ${availNum}`);
      return;
    }

    // If subcontractor => must pick sub + contract number
    if (outStockTo === "1") {
      if (!subcontractor) {
        alert("Please select a subcontractor.");
        return;
      }
      if (!contractNumber) {
        alert("Please select a contract number.");
        return;
      }
    }

    // If other site => must pick site
    if (outStockTo === "4") {
      if (!destinationSite) {
        alert("Please select a destination site.");
        return;
      }
    }

    // Build payload as in your .cshtml
    const payload = {
      RefNo: refNo,
      OutNo: outNo,
      Date: outDate,
      OutStockNote: outStockNote,
      ItemId: selectedItem,
      unit,
      Qty: availableQty,
      Quantity: outQty,
      search: outStockTo,
      SubId: subcontractor,
      NumId: contractNumber,
      ToSiteId: destinationSite,
      Remarks: remarks,
    };

    try {
      const resp = await apiRequest("Stock/OutStock", "POST", token, payload);
      if (resp.success) {
        alert("Stock Out saved successfully.");
        onSuccess(); // let parent do a table refresh
      } else {
        alert("Error: " + (resp.message || "Saving failed."));
      }
    } catch (error) {
      alert("Error performing OutStock.");
      console.error(error);
    }
  };

  // If item changes, fetch unit & available stock
  const handleItemChange = async (val: string) => {
    setSelectedItem(val);
    if (!val) {
      setUnit("");
      setAvailableQty("");
      return;
    }
    try {
      const result = await apiRequest(`Stock/GetUnit?val=${val}`, "GET", token);
      if (result.success) {
        setUnit(result.data?.getData || "");
        setAvailableQty(result.data?.stock || "");
      } else {
        alert(`Error retrieving item data: ${result.message || ""}`);
      }
    } catch (error) {
      alert("Error fetching item info.");
      console.error(error);
    }
  };

  return (
    <dialog ref={dialogRef} className="modal modal-open">
      <form method="dialog" className="modal-box max-w-5xl">
        <h3 className="font-bold text-lg mb-4">
          {dialogType === "Add" ? "New Stock Out" : "Edit Stock Out"}
        </h3>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="label">Ref No</label>
            <input
              type="text"
              className="input input-bordered w-full"
              value={refNo}
              readOnly
            />
          </div>
          <div>
            <label className="label">Out No</label>
            <input
              type="text"
              className="input input-bordered w-full"
              value={outNo}
              readOnly
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-2">
          <div>
            <label className="label">Out Date</label>
            <input
              type="date"
              className="input input-bordered w-full"
              value={outDate}
              onChange={(e) => setOutDate(e.target.value)}
            />
          </div>
          <div>
            <label className="label">OutStock Note</label>
            <div className="flex">
              <input
                type="text"
                className="input input-bordered w-1/2 mr-1"
                value={outStockNotePrefix}
                readOnly
              />
              <span className="p-2">-</span>
              <input
                type="text"
                className="input input-bordered w-1/2"
                value={outStockNoteSuffix}
                onChange={(e) => setOutStockNoteSuffix(e.target.value)}
              />
            </div>
            <small className="text-gray-400">
              Change suffix if needed; prefix is locked (SiteCode-UserId).
            </small>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mt-2">
          <div>
            <label className="label">Select Item</label>
            <select
              className="select select-bordered w-full"
              value={selectedItem}
              onChange={(e) => handleItemChange(e.target.value)}
            >
              <option value="">--Select Item--</option>
              {items.map((it) => (
                <option key={it.value} value={it.value}>
                  {it.text}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="label">Unit</label>
            <input
              type="text"
              className="input input-bordered w-full"
              value={unit}
              readOnly
            />
          </div>
          <div>
            <label className="label">Available Qty</label>
            <input
              type="text"
              className="input input-bordered w-full"
              value={availableQty}
              readOnly
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mt-2">
          <div>
            <label className="label">Out Qty</label>
            <input
              type="number"
              className="input input-bordered w-full"
              value={outQty}
              onChange={(e) => setOutQty(e.target.value)}
            />
          </div>
          <div>
            <label className="label">Out Stock To</label>
            <select
              className="select select-bordered w-full"
              value={outStockTo}
              onChange={(e) => setOutStockTo(e.target.value)}
            >
              <option value="">Select Out Stock To</option>
              <option value="1">Subcontractor</option>
              <option value="3">Site Consumption</option>
              <option value="4">Other Site</option>
            </select>
          </div>

          {/* If Subcontractor => show sub + contract # */}
          {outStockTo === "1" && (
            <div>
              <label className="label">Subcontractor</label>
              <select
                className="select select-bordered w-full"
                value={subcontractor}
                onChange={(e) => {
                  setSubcontractor(e.target.value);
                  setContractNumber(""); // reset contract #
                  // Optionally fetch contract # list for this sub
                }}
              >
                <option value="">--Select Subcontractor--</option>
                {subcontractors.map((sub) => (
                  <option key={sub.id} value={sub.id}>
                    {sub.name}
                  </option>
                ))}
              </select>

              <label className="label mt-2">Contract #</label>
              <select
                className="select select-bordered w-full"
                value={contractNumber}
                onChange={(e) => setContractNumber(e.target.value)}
              >
                <option value="">---</option>
              </select>
            </div>
          )}

          {/* If Other Site => show site pick */}
          {outStockTo === "4" && (
            <div>
              <label className="label">Destination Site</label>
              <select
                className="select select-bordered w-full"
                value={destinationSite}
                onChange={(e) => setDestinationSite(e.target.value)}
              >
                <option value="">--Select Site--</option>
                {otherSites.map((s: any) => (
                  <option key={s.siteId} value={s.siteId}>
                    {s.siteName}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        <div className="mt-2">
          <label className="label">Remarks</label>
          <textarea
            className="textarea textarea-bordered w-full"
            rows={2}
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
          />
        </div>

        <div className="modal-action mt-4">
          <button type="button" className="btn" onClick={handleConfirm}>
            Confirm
          </button>
          <button type="button" className="btn" onClick={handleHide}>
            Close
          </button>
        </div>
      </form>
    </dialog>
  );
};

export default StockOutDialog;