import { useState, useEffect } from "react";
import PageMetaData from "@/components/PageMetaData";
import PageTitle from "@/components/PageTitle";
import PAMTable from "@/components/Table";
import { Loader } from "@/components/Loader";
import { useDialog } from "@/components/daisyui";
import { useAuthContext } from "@/states/auth";
import apiRequest from "@/services/api/api";
import useStockOut from "./use-stock-out";

const StockOutPage = () => {
  const { columns, tableData, loading } = useStockOut();
  const { authState } = useAuthContext();
  const token = authState.user?.token || "";
  const siteId = authState.user?.siteid || 0;
  const roleId = authState.user?.roleid;

  // Modal/dialog states
  const { dialogRef, handleShow, handleHide } = useDialog();
  const [dialogOpen, setDialogOpen] = useState(false);

  // Form states
  const [refNo, setRefNo] = useState("");
  const [outNo, setOutNo] = useState("");
  const [outDate, setOutDate] = useState(new Date().toISOString().split("T")[0]);
  const [outStockNotePrefix, setOutStockNotePrefix] = useState("SITE-123");
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

  // Example: simulating data from server for these fields
  useEffect(() => {
    setRefNo("BS-SITE01-0005");
    setOutNo("OUT123");
    setOutStockNotePrefix("SITE-1");
    setOutStockNoteSuffix("0005");
  }, []);

  const canStockOut =
    roleId === 4 || roleId === 5 || roleId === 7 || roleId === 10;

  const handleOpenDialog = () => {
    setDialogOpen(true);
    handleShow();
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    handleHide();
  };

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
      }
    } catch (error) {
      console.error("Error fetching item info:", error);
    }
  };

  const handleConfirm = async () => {
    const finalNote = `${outStockNotePrefix.trim()}-${outStockNoteSuffix.trim()}`;
    if (!selectedItem || !outQty || !outDate || !outStockTo || !finalNote) {
      alert("Please fill all required fields.");
      return;
    }
    try {
      const payload = {
        RefNo: refNo,
        OutNo: outNo,
        Date: outDate,
        OutStockNote: finalNote,
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
      const resp = await apiRequest("Stock/OutStock", "POST", token, payload);
      if (resp.success) {
        alert("Item saved successfully.");
        // ... refresh table data if needed
      } else {
        alert("Error: " + (resp.message || "Saving failed."));
      }
    } catch (error) {
      alert("Error performing OutStock.");
      console.error(error);
    }
  };

  return (
    <div>
      <PageMetaData title="Stock Out" />
      <PageTitle title="Stock Out" subMenu="Dashboard" center="Operations" />

      {loading ? (
        <Loader />
      ) : (
        <>
          {siteId === 0 ? (
            <p>Please select a valid site to view stock out data.</p>
          ) : tableData.length > 0 ? (
            <>
              <PAMTable
                columns={columns}
                tableData={tableData}
                title="Stock Out"
                loading={loading}
                addBtn={canStockOut}
                showAction={true}
                actions={false}
                openStaticDialog={() => handleOpenDialog()}
              />

              {/* Dialog for Stock Out Form */}
              {dialogOpen && (
                <div className="modal modal-open">
                  <div ref={dialogRef} className="modal-box max-w-5xl">
                    <h3 className="font-bold text-lg mb-4">Stock Out Form</h3>

                    {/* Example form layout */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label>Ref No</label>
                        <input
                          type="text"
                          className="input input-bordered w-full"
                          value={refNo}
                          readOnly
                        />
                      </div>
                      <div>
                        <label>Out No</label>
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
                        <label>Out Date</label>
                        <input
                          type="date"
                          className="input input-bordered w-full"
                          value={outDate}
                          onChange={(e) => setOutDate(e.target.value)}
                        />
                      </div>
                      <div>
                        <label>OutStock Note</label>
                        <div className="flex">
                          <input
                            type="text"
                            className="input input-bordered w-1/3 mr-1"
                            value={outStockNotePrefix}
                            readOnly
                          />
                          <span className="p-2">-</span>
                          <input
                            type="text"
                            className="input input-bordered w-2/3"
                            value={outStockNoteSuffix}
                            onChange={(e) => setOutStockNoteSuffix(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mt-2">
                      <div>
                        <label>Select Item</label>
                        <select
                          className="select select-bordered w-full"
                          value={selectedItem}
                          onChange={(e) => handleItemChange(e.target.value)}
                        >
                          <option value="">--Select Item--</option>
                          <option value="1">Item 1</option>
                          <option value="2">Item 2</option>
                          {/* Populate from your actual items list */}
                        </select>
                      </div>
                      <div>
                        <label>Unit</label>
                        <input
                          type="text"
                          className="input input-bordered w-full"
                          value={unit}
                          readOnly
                        />
                      </div>
                      <div>
                        <label>Available Qty</label>
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
                        <label>Out Qty</label>
                        <input
                          type="number"
                          className="input input-bordered w-full"
                          value={outQty}
                          onChange={(e) => setOutQty(e.target.value)}
                        />
                      </div>
                      <div>
                        <label>Out Stock To</label>
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

                      {/* If Subcontractor, show these fields */}
                      {outStockTo === "1" && (
                        <div>
                          <label>Subcontractor</label>
                          <select
                            className="select select-bordered w-full"
                            value={subcontractor}
                            onChange={(e) => setSubcontractor(e.target.value)}
                          >
                            <option value="">--Select Subcontractor--</option>
                            {/* Populate with your subcontractors list */}
                          </select>

                          <label>Contract #</label>
                          <select
                            className="select select-bordered w-full mt-1"
                            value={contractNumber}
                            onChange={(e) => setContractNumber(e.target.value)}
                          >
                            <option value="">---</option>
                            {/* Populate with contract numbers */}
                          </select>
                        </div>
                      )}

                      {/* If Other Site, show destination site field */}
                      {outStockTo === "4" && (
                        <div>
                          <label>Destination Site</label>
                          <select
                            className="select select-bordered w-full"
                            value={destinationSite}
                            onChange={(e) => setDestinationSite(e.target.value)}
                          >
                            <option value="">--Select Site--</option>
                            {/* Populate with site list */}
                          </select>
                        </div>
                      )}
                    </div>

                    <div className="mt-2">
                      <label>Remarks</label>
                      <textarea
                        className="textarea textarea-bordered w-full"
                        rows={2}
                        value={remarks}
                        onChange={(e) => setRemarks(e.target.value)}
                      />
                    </div>

                    <div className="modal-action mt-4">
                      <button className="btn mr-2" onClick={handleConfirm}>
                        Confirm
                      </button>
                      <button className="btn" onClick={handleCloseDialog}>
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </>
          ) : (
            <p>No data available</p>
          )}
        </>
      )}
    </div>
  );
};

export default StockOutPage;