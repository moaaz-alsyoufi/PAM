import { useState, useEffect } from "react";
import apiRequest from "@/services/api/api";

const useRequests = (siteId: number, token: string) => {
  const hasActions = true;
  const [tableData, setTableData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const columns = {
    refNo: "Request",
    isApprovedByPm: "PM Approved",
    status: "Status",
    date: "Date",
    ordered_percent: "Ordered %",
    deliv_percent: "Deliv.%",
  };

  const inputFields: any[] = [];

  useEffect(() => {
    setLoading(true);

    if (siteId > 0 && token) {
      apiRequest(`Requests/listrequests/${siteId}`, "GET", token)
        .then((res: any[]) => {
          const formattedRes = res.map((item) => ({
            ...item,
            isApprovedByPm: item.isApprovedByPm ? "Approved" : "-",
            date: new Date(item.date).toLocaleDateString("en-GB"),
          }));
          console.log(formattedRes);

          setTableData(formattedRes);
        })
        .catch((error) => {
          console.error("Error fetching requests:", error);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setTableData([]);
      setLoading(false);
    }
  }, [siteId, token]);

  return {
    columns,
    tableData,
    inputFields,
    hasActions,
    loading,
  };
};

export default useRequests;
