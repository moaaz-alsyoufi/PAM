import { useState, useEffect, useMemo } from "react";
import apiRequest from "@/services/api/api";

const useRequests = (siteId: number, token: string) => {
  const hasActions = true;
  const [tableData, setTableData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const columns = {
    request: "Request",
    pm_approved: "PM Approved",
    status: "Status",
    date: "Date",
    ordered_percent: "Ordered %",
    deliv_percent: "Deliv.%",
  };

  const inputFields: any[] = [];

  // Pagination state
  const [currentPage, setCurrentPage] = useState<number>(1);
  const rowsPerPage = 20;

  useEffect(() => {
    setLoading(true);
    console.log("Fetching requests with siteId:", siteId, "and token:", token);

    if (siteId > 0 && token) {
      apiRequest(`Requests/listrequests/${siteId}`, "GET", token)
        .then((res: any[]) => {
          console.log("API response:", res);
          const formattedRes = res.map((item) => ({
            ...item,
            request: item.refNo,
            pm_approved: item.isApprovedByPm,
            date: new Date(item.date).toLocaleDateString("en-GB"),
          }));
          setTableData(formattedRes);
        })
        .catch((error) => {
          console.error("Error fetching requests:", error);
        })
        .finally(() => {
          // Ensure loading is set to false once the API call is done
          setLoading(false);
        });
    } else {
      // If siteId is invalid or token is missing, empty the table
      setTableData([]);
      setLoading(false);
    }
  }, [siteId, token]);

  // Memoized slice for the current page
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = currentPage * rowsPerPage;
    return tableData.slice(startIndex, endIndex);
  }, [tableData, currentPage]);

  const totalPages = Math.ceil(tableData.length / rowsPerPage);

  return {
    columns,
    tableData,
    paginatedData,
    inputFields,
    hasActions,
    currentPage,
    setCurrentPage,
    rowsPerPage,
    totalPages,
    loading,
  };
};

export default useRequests;