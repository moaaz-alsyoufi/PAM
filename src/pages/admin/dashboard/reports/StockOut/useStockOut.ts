import { useState, useEffect } from "react";
import apiRequest from "@/services/api/api";
import { useAuthContext } from "@/states/auth";

function useStockOut() {
  const [tableData, setTableData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const { authState } = useAuthContext();
  const siteId = authState.user?.siteid || 0;
  const token = authState.user?.token || "";

  // Table columns matching the JSON fields from GetStockOutStatus
  const columns = {
    outNo: "Out No",
    refNo: "Ref No",
    itemName: "Item Name",
    quantity: "Qty",
    date: "Date",
    subName: "Entity",
    contractNumber: "Contract #",
    outStockNote: "OutStock Note",
  };

  async function reloadData() {
    setLoading(true);
    if (siteId > 0 && token) {
      try {
        // GET /api/Stock/GetStockOutStatus/{siteId}
        const result = await apiRequest(
          `Stock/GetStockOutStatus/${siteId}`,
          "GET",
          token
        );
        if (Array.isArray(result)) {
          // Convert date to localized string
          const mapped = result.map((row: any) => ({
            ...row,
            date: row.date ? new Date(row.date).toLocaleDateString() : "",
          }));
          setTableData(mapped);
        } else {
          console.error("Unexpected response:", result);
          setTableData([]);
        }
      } catch (err) {
        console.error("Error fetching stock out data:", err);
        setTableData([]);
      } finally {
        setLoading(false);
      }
    } else {
      setTableData([]);
      setLoading(false);
    }
  }

  async function exportStockOut(outId: number) {
    // Example: GET /api/Stock/Download_OutStock/{id}
    // or /Stock/Download_OutStock?id=xxx
    const pdfBlob = await apiRequest(
      `Stock/Download_OutStock/${outId}`,
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