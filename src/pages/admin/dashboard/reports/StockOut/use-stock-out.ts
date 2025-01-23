import { useState, useEffect } from "react";
import apiRequest from "@/services/api/api";
import { useAuthContext } from "@/states/auth";

/**
 * This hook mirrors your existing pattern in `useRequests`,
 * providing tableData, columns, plus an `exportStockOut` method
 * to fetch a PDF (blob) from the server.
 */
function useStockOut() {
  const [tableData, setTableData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const { authState } = useAuthContext();
  const siteId = authState.user?.siteid || 0;
  const token = authState.user?.token || "";

  /**
   * Table columns (no inline “Print” column).
   * We'll rely on the table's built-in 'actions' approach
   * for showing an action button to 'Preview' or 'Print'.
   */
  const columns = {
    outNo: "Out No",
    refNo: "Ref No",
    quantity: "Quantity",
    date: "Date",
    remarks: "Remarks",
    outStockNote: "Out Stock Note",
  };

  /**
   * This function fetches a PDF or any printable
   * document from the server, e.g.:
   *    GET /Stock/PrintOutStock/{outId}
   */
  async function exportStockOut(outId: number) {
    // If your endpoint differs, adjust the path:
    // e.g. /Stock/PrintOutStock/{outId} or /Stock/export/{outId}
    const pdfBlob = await apiRequest(
      `Stock/PrintOutStock/${outId}`,
      "GET",
      token,
      null,
      "blob" // let apiRequest handle responseType = 'blob'
    );
    return pdfBlob as Blob;
  }

  /** 
   * Load data on mount or when site/token changes 
   */
  useEffect(() => {
    setLoading(true);

    if (siteId > 0 && token) {
      apiRequest(`Stock/GetStockOutStatus/${siteId}`, "GET", token)
        .then((res: any[]) => {
          // Map each row if needed
          const mapped = res.map((row) => ({
            ...row,
            date: row.date ? new Date(row.date).toLocaleDateString() : "",
          }));
          setTableData(mapped);
        })
        .catch((err) => {
          console.error("Error fetching stock out data:", err);
          setTableData([]);
        })
        .finally(() => setLoading(false));
    } else {
      // No valid site or token => empty table
      setTableData([]);
      setLoading(false);
    }
  }, [siteId, token]);

  return {
    columns,
    tableData,
    loading,
    exportStockOut, // we'll call this when user hits 'Preview' or 'Print'
  };
}

export default useStockOut;