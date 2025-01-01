import { useState, useEffect } from "react";
import PageMetaData from "@/components/PageMetaData";
import PageTitle from "@/components/PageTitle";
import PAMTable from "@/components/Table";
import useRequests from "./use-requests";
import { useAuthContext } from "@/states/auth";
import { Loader } from "@/components/Loader";

const Requests = () => {
  const { authState } = useAuthContext();
  const siteId = authState.user?.siteid || 0;
  const roleId = authState.user?.roleid;

  const {
    columns,
    tableData,
    inputFields,
    hasActions,
    loading,
    previewColumns,
    newRequestRefNumber,
    subContractors,
    costCodes,
    searchedItems,
    fetchNewRequestData,
    searchItems,
    createNewRequest,
  } = useRequests();

  const canMakeNewRequest =
    roleId === 4 || roleId === 5 || roleId === 7 || roleId === 10;

  const [showNewRequest, setShowNewRequest] = useState(false);
  const [remarks, setRemarks] = useState("");
  const [subId, setSubId] = useState<number | null>(null);
  const [costCodeId, setCostCodeId] = useState<number | null>(null);
  const [itemSearchTerm, setItemSearchTerm] = useState("");
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
  const [selectedItemUnit, setSelectedItemUnit] = useState("");
  const [quantity, setQuantity] = useState<number>(0);
  const [itemsToAdd, setItemsToAdd] = useState<
    { itemId: number; quantity: number; costCodeId: number; subId: number; unit?: string }[]
  >([]);

  useEffect(() => {
    if (itemSearchTerm) {
      const delay = setTimeout(() => {
        searchItems(itemSearchTerm);
      }, 300);
      return () => clearTimeout(delay);
    }
  }, [itemSearchTerm, searchItems]);

  const handleOpenNewRequest = async () => {
    await fetchNewRequestData();
    setShowNewRequest(true);
    setRemarks("");
    setSubId(null);
    setCostCodeId(null);
    setItemSearchTerm("");
    setItemsToAdd([]);
    setSelectedItemId(null);
    setSelectedItemUnit("");
    setQuantity(0);
  };

  const handleSelectItem = (itm: any) => {
    setSelectedItemId(parseInt(itm.itemId));
    setSelectedItemUnit(itm.itemUnit);
    setItemSearchTerm(itm.text);
  };

  const handleAddItem = () => {
    if (!selectedItemId) return;
    setItemsToAdd((prev) => [
      ...prev,
      {
        itemId: selectedItemId,
        quantity: quantity || 0,
        costCodeId: costCodeId || 0,
        subId: subId || 0,
        unit: selectedItemUnit,
      },
    ]);
    setSelectedItemId(null);
    setSelectedItemUnit("");
    setItemSearchTerm("");
    setQuantity(0);
  };

  const handleCreateRequest = async () => {
    if (!itemsToAdd.length) {
      alert("Please add at least one item.");
      return;
    }
    const mappedItems = itemsToAdd.map((it) => ({
      itemId: it.itemId,
      quantity: it.quantity,
      costCodeId: it.costCodeId,
      subId: it.subId,
    }));
    try {
      const res = await createNewRequest(remarks, mappedItems);
      alert(`Request created successfully! Ref#: ${res.refNumber}`);
      setShowNewRequest(false);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <PageMetaData title="Requests" />
      <PageTitle title="Requests" subMenu="Dashboard" center="Operations" />

      {loading ? (
        <Loader />
      ) : (
        <div>
          {siteId === 0 ? (
            <p>Please select a valid site to view requests.</p>
          ) : tableData.length > 0 ? (
            <PAMTable
              columns={columns}
              tableData={tableData}
              inputFields={inputFields}
              title="Request"
              loading={loading}
              actions={hasActions}
              showAction={true}
              previewColumns={previewColumns}
              addBtn={canMakeNewRequest}
            />
          ) : (
            <p>No data available</p>
          )}
        </div>
      )}

      {canMakeNewRequest && (
        <button style={{ marginTop: 10 }} onClick={handleOpenNewRequest}>
          + New Request
        </button>
      )}

      {showNewRequest && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.5)",
            zIndex: 9999,
          }}
        >
          <div
            style={{
              background: "#fff",
              width: "700px",
              margin: "50px auto",
              padding: "20px",
              borderRadius: "4px",
              maxHeight: "80vh",
              overflowY: "auto",
            }}
          >
            <h3>New Request</h3>
            <div style={{ display: "flex", gap: "1rem", marginBottom: 12 }}>
              <div>
                <label>Request</label>
                <input
                  readOnly
                  value={newRequestRefNumber || ""}
                  style={{ width: 200, display: "block", marginTop: 4 }}
                />
              </div>
              <div>
                <label>Select Sub</label>
                <select
                  style={{ width: 200, marginTop: 4 }}
                  value={subId ?? ""}
                  onChange={(e) => setSubId(parseInt(e.target.value))}
                >
                  <option value="">--Select Sub--</option>
                  {subContractors.map((sub) => (
                    <option key={sub.subId} value={sub.subId}>
                      {sub.subName}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label>Remarks</label>
                <input
                  style={{ width: 200, marginTop: 4 }}
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                />
              </div>
            </div>

            <div style={{ display: "flex", gap: "1rem" }}>
              <div>
                <label>Select Item</label>
                <input
                  style={{ width: 180, marginTop: 4 }}
                  placeholder="--Select Item--"
                  value={itemSearchTerm}
                  onChange={(e) => setItemSearchTerm(e.target.value)}
                />
                {searchedItems.length > 0 && itemSearchTerm && (
                  <ul
                    style={{
                      border: "1px solid #ccc",
                      margin: 0,
                      padding: 0,
                      listStyle: "none",
                      maxHeight: 120,
                      overflowY: "auto",
                      width: 180,
                      background: "#fff",
                      position: "absolute",
                    }}
                  >
                    {searchedItems.map((itm) => (
                      <li
                        key={itm.itemId}
                        style={{ padding: "4px", cursor: "pointer" }}
                        onClick={() => handleSelectItem(itm)}
                      >
                        {itm.text}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div>
                <label>Unit</label>
                <input
                  readOnly
                  style={{ width: 80, marginTop: 4 }}
                  value={selectedItemUnit}
                />
              </div>

              <div>
                <label>Cost Code</label>
                <select
                  style={{ width: 120, marginTop: 4 }}
                  value={costCodeId ?? ""}
                  onChange={(e) => setCostCodeId(parseInt(e.target.value))}
                >
                  <option value="">Go for Code</option>
                  {costCodes.map((code) => (
                    <option key={code.codeId} value={code.codeId}>
                      {code.code}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label>Qty</label>
                <input
                  type="number"
                  style={{ width: 80, marginTop: 4 }}
                  value={quantity || ""}
                  onChange={(e) => setQuantity(parseFloat(e.target.value) || 0)}
                />
              </div>

              <div style={{ alignSelf: "end", marginBottom: 4 }}>
                <button onClick={handleAddItem} style={{ marginLeft: 6 }}>
                  Add
                </button>
              </div>
            </div>

            <div style={{ marginTop: 16 }}>
              {itemsToAdd.length > 0 && (
                <table
                  style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    marginTop: 10,
                  }}
                >
                  <thead>
                    <tr>
                      <th style={{ border: "1px solid #ccc", padding: 4 }}>
                        Item ID
                      </th>
                      <th style={{ border: "1px solid #ccc", padding: 4 }}>
                        Unit
                      </th>
                      <th style={{ border: "1px solid #ccc", padding: 4 }}>
                        Cost Code
                      </th>
                      <th style={{ border: "1px solid #ccc", padding: 4 }}>
                        Qty
                      </th>
                      <th style={{ border: "1px solid #ccc", padding: 4 }}>
                        Remove
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {itemsToAdd.map((it, idx) => (
                      <tr key={idx}>
                        <td style={{ border: "1px solid #ccc", padding: 4 }}>
                          {it.itemId}
                        </td>
                        <td style={{ border: "1px solid #ccc", padding: 4 }}>
                          {it.unit || ""}
                        </td>
                        <td style={{ border: "1px solid #ccc", padding: 4 }}>
                          {it.costCodeId}
                        </td>
                        <td style={{ border: "1px solid #ccc", padding: 4 }}>
                          {it.quantity}
                        </td>
                        <td style={{ border: "1px solid #ccc", padding: 4 }}>
                          <button
                            onClick={() => {
                              setItemsToAdd((prev) =>
                                prev.filter((_, i) => i !== idx)
                              );
                            }}
                          >
                            X
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>

            <div style={{ marginTop: 20, display: "flex", gap: 10 }}>
              <button onClick={() => setShowNewRequest(false)}>
                Cancel Request
              </button>
              <button onClick={handleCreateRequest}>
                Create Request
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Requests;