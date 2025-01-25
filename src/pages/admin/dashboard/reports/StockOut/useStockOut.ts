import { useState, useEffect } from "react";
import apiRequest from "@/services/api/api";
import { useAuthContext } from "@/states/auth";

function useStockOut() {
  const [tableData, setTableData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const { authState } = useAuthContext();
  const siteId = authState.user?.siteid || 0;
  const token = authState.user?.token || "";

  // The columns object keys match the fields returned by the backend
  const columns = {
    outNo: "Out No",
    refNo: "Ref No",
    itemName: "Item Name",
    quantity: "Qty",
    date: "Date",            // We'll parse to a string
    subName: "Entity",       // "Returned to Supplier", "Site Consumption", etc.
    contractNumber: "Contract #",
    outStockNote: "OutStock Note", // might be null
  };

  async function reloadData() {
    setLoading(true);
    if (siteId > 0 && token) {
      try {
        // e.g. GET /api/Stock/GetStockOutStatus/{siteId}
        const result = await apiRequest(`Stock/GetStockOutStatus/${siteId}`, "GET", token);
        if (Array.isArray(result)) {
          // Convert date to a localized string
          const mapped = result.map((row: any) => {
            return {
              ...row,
              date: row.date ? new Date(row.date).toLocaleDateString() : "",
            };
          });
          setTableData(mapped);
        } else {
          // If it's not an array, fallback
          console.error("Unexpected response format:", result);
          setTableData([]);
        }
      } catch (err) {
        console.error("Error fetching stock out data:", err);
        setTableData([]);
      } finally {
        setLoading(false);
      }
    } else {
      // If no valid siteId/token, reset table
      setTableData([]);
      setLoading(false);
    }
  }

  // For PDF printing
  async function exportStockOut(outId: number) {
    // e.g. GET /Stock/Download_OutStock?id=xxx
    // or GET /Stock/PrintOutStock/${outId}
    const pdfBlob = await apiRequest(
      `Stock/PrintOutStock/${outId}`,
      "GET",
      token,
      null,
      "blob"
    );
    return pdfBlob as Blob;
  }

  useEffect(() => {
    reloadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [siteId, token]);

  return {
    columns,
    tableData,
    loading,
    exportStockOut,
    reloadData,
  };
}

export default useStockOut;