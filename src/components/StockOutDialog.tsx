import React, { useState, useEffect } from "react";
import { useAuthContext } from "@/states/auth";
import apiRequest from "@/services/api/api";

interface StockOutDialogProps {
  dialogRef: React.RefObject<HTMLDialogElement | null>;
  dialogType: "Add" | "Edit" | "Preview" | "Select";
  current: any;
  handleHide: () => void;
  onSuccess: () => void;
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
  const token     = user?.token    || "";
  const userId    = user?.id       || 0;
  const roleId    = user?.roleid   || 0;
  const siteId    = user?.siteid   || 0;
  const siteCode  = user?.siteCode || "SITE";

  // Form states
  const [refNo, setRefNo]                     = useState("");
  const [outNo, setOutNo]                     = useState("");
  const [outDate, setOutDate]                 = useState("");
  const [outStockNotePrefix, setOutStockNotePrefix] = useState("");
  const [outStockNoteSuffix, setOutStockNoteSuffix] = useState("");
  const [selectedItem, setSelectedItem]       = useState("");
  const [unit, setUnit]                       = useState("");
  const [availableQty, setAvailableQty]       = useState("");
  const [outQty, setOutQty]                   = useState("");
  const [outStockTo, setOutStockTo]           = useState("");
  const [subcontractor, setSubcontractor]     = useState("");
  const [contractNumber, setContractNumber]   = useState("");
  const [destinationSite, setDestinationSite] = useState("");
  const [remarks, setRemarks]                 = useState("");

  // Combo data
  const [items, setItems]                       = useState<any[]>([]);
  const [subcontractorsList, setSubcontractors] = useState<any[]>([]);
  const [otherSites, setOtherSites]             = useState<any[]>([]);
  const [contractNumbers, setContractNumbers]   = useState<any[]>([]);

  useEffect(() => {
    // If opening "Add" or "Edit", show the native <dialog>
    if (dialogRef.current && (dialogType === "Add" || dialogType === "Edit")) {
      dialogRef.current.showModal();
    }

    if (dialogType === "Add") {
      // 1) Set initial fields
      setRefNo(`BS-${siteCode}-0001`);
      setOutNo("100");
      setOutDate(new Date().toISOString().split("T")[0]);
      setOutStockNotePrefix(`${siteCode}-${userId}`);
      setOutStockNoteSuffix("0005");
      setSelectedItem("");
      setUnit("");
      setAvailableQty("");
      setOutQty("");
      setOutStockTo("");
      setSubcontractor("");
      setContractNumber("");
      setDestinationSite("");
      setRemarks("");

      // 2) Load combos
      fetchInitialData();
    }
    else if (dialogType === "Edit" && current) {
      // Pre-fill from "current"
      setRefNo(current.refNo || "");
      setOutNo(current.outNo || "");

      let isoDate = current.date
        ? new Date(current.date).toISOString().split("T")[0]
        : new Date().toISOString().split("T")[0];
      setOutDate(isoDate);

      if (current.outStockNote) {
        const parts = current.outStockNote.split("-");
        setOutStockNotePrefix(parts.slice(0,2).join("-"));
        setOutStockNoteSuffix(parts[2] || "");
      } else {
        setOutStockNotePrefix(`${siteCode}-${userId}`);
        setOutStockNoteSuffix("");
      }

      setSelectedItem(current.itemId || "");
      setUnit(current.itemUnit || "");
      setAvailableQty("");
      setOutQty(current.quantity || "");
      setOutStockTo(""); // or current.search if you have that
      setSubcontractor("");
      setContractNumber(current.contractNumber || "");
      setDestinationSite("");
      setRemarks(current.remarks || "");

      fetchInitialData();
    }
  }, [dialogType, current]);

  /** Fetch combos: items, contractors, other sites, etc. */
  const fetchInitialData = async () => {
    try {
      // 1) Items => GET /api/Stock/PopulateOutItems?siteId=xx
      const itemsRes = await apiRequest(
        `Stock/PopulateOutItems?siteId=${siteId}`,
        "GET",
        token
      );
      if (itemsRes.success) {
        setItems(itemsRes.data || []);
      }

      // 2) Subcontractors => GET /api/Stock/PopulateContractors?siteId=xx
      const subsRes = await apiRequest(
        `Stock/PopulateContractors?siteId=${siteId}`,
        "GET",
        token
      );
      if (subsRes.success) {
        setSubcontractors(subsRes.data || []);
      }

      // 3) Other sites => GET /api/Stock/PopulateSitesForOtherSite?siteId=xx
      const otherRes = await apiRequest(
        `Stock/PopulateSitesForOtherSite?siteId=${siteId}`,
        "GET",
        token
      );
      if (otherRes.success) {
        setOtherSites(otherRes.data || []);
      }
    } catch (error: any) {
      console.error("Error fetching combos:", error);
      alert(error.message || "Error fetching combos");
    }
  };

  /** If user changes item => fetch GetUnit?itemId=xx&siteId=yy */
  const handleItemChange = async (val: string) => {
    setSelectedItem(val);
    if (!val) {
      setUnit("");
      setAvailableQty("");
      return;
    }
    try {
      const result = await apiRequest(
        `Stock/GetUnit?itemId=${val}&siteId=${siteId}`,
        "GET",
        token
      );
      if (result.success) {
        // Notice that old .cshtml code read from result.Data.GetData
        // but we can adapt it:
        let dataObj = result.data || result.Data;
        // If your JSON is {success:true, data:{getData:'U',stock:30}}, do:
        setUnit(dataObj.getData || "");
        setAvailableQty(dataObj.stock || "");
      } else {
        alert("Error retrieving item data: " + (result.message || ""));
      }
    } catch (error) {
      console.error("Error fetching item info:", error);
      alert("Error fetching item info.");
    }
  };

  /** If user picks a subcontractor => fetch PopulateNum?subId=xx&siteId=yy */
  const handleSubcontractorChange = async (subVal: string) => {
    setSubcontractor(subVal);
    setContractNumber("");
    if (!subVal) return;

    try {
      const data = await apiRequest(
        `Stock/PopulateNum?subId=${subVal}&siteId=${siteId}`,
        "GET",
        token
      );
      if (data.success) {
        // data.data => array of {numId, contractNumber}
        setContractNumbers(data.data || []);
      } else {
        alert("Error fetching contract numbers");
      }
    } catch (err) {
      console.error("Error fetching contract #:", err);
      alert("Error fetching contract #");
    }
  };

  /** Confirm => POST to /api/Stock/OutStock */
  const handleConfirm = async () => {
    // Build final note => prefix-suffix
    const outStockNote = `${outStockNotePrefix.trim()}-${outStockNoteSuffix.trim()}`;
    if (!selectedItem || !outQty || !outDate || !outStockTo || !outStockNote) {
      alert("Please fill required fields (item, outQty, date, OutStockTo, note).");
      return;
    }

    const qtyNum   = parseFloat(outQty);
    const availNum = parseFloat(availableQty) || 0;
    if (qtyNum <= 0) {
      alert("Qty must be > 0");
      return;
    }
    if (qtyNum > availNum) {
      alert(`Qty cannot exceed available: ${availNum}`);
      return;
    }

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
    if (outStockTo === "4") {
      if (!destinationSite) {
        alert("Please select a destination site.");
        return;
      }
    }

    const payload = {
      // The new .NET code expects RoleId, UserId, SiteId
      RoleId: roleId,
      UserId: userId,
      SiteId: siteId,

      RefNo: refNo,
      OutNo: outNo,
      Date: outDate,
      OutStockNote: outStockNote,
      ItemId: Number(selectedItem),
      Quantity: qtyNum,
      Remarks: remarks,

      Search: outStockTo,
      SubId: subcontractor ? Number(subcontractor) : null,
      NumId: contractNumber ? Number(contractNumber) : null,
      ToSiteId: destinationSite ? Number(destinationSite) : null,
    };

    try {
      const resp = await apiRequest("Stock/OutStock", "POST", token, payload);
      if (resp.success) {
        alert("Stock Out saved successfully.");
        onSuccess(); // parent -> reloadData + hide
      } else {
        alert("Error: " + (resp.message || "Saving failed."));
      }
    } catch (error) {
      alert("Error performing OutStock. See console.");
      console.error(error);
    }
  };

  /** Close => native dialog close + parent's handleHide */
  const handleClose = () => {
    if (dialogRef.current) {
      dialogRef.current.close(); // native <dialog> close
    }
    handleHide();
  };

  return (
    <dialog ref={dialogRef} className="modal-box max-w-5xl p-6">
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
              <option key={it.itemId} value={it.itemId}>
                {it.itemName}
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

        {/* If sub => show sub & contractNumber */}
        {outStockTo === "1" && (
          <div>
            <label className="label">Subcontractor</label>
            <select
              className="select select-bordered w-full"
              value={subcontractor}
              onChange={(e) => handleSubcontractorChange(e.target.value)}
            >
              <option value="">--Select--</option>
              {subcontractorsList.map((s) => (
                <option key={s.subId} value={s.subId}>
                  {s.subName}
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
              {contractNumbers.map((cn) => (
                <option key={cn.numId} value={cn.numId}>
                  {cn.contractNumber}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* If other site => pick site from otherSites */}
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

      <div className="mt-4 flex justify-end gap-2">
        <button type="button" className="btn" onClick={handleConfirm}>
          Confirm
        </button>
        <button type="button" className="btn" onClick={handleClose}>
          Close
        </button>
      </div>
    </dialog>
  );
};

export default StockOutDialog;