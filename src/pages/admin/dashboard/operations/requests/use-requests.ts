import { useState, useEffect } from "react";
import apiRequest from "@/services/api/api";
import { useAuthContext } from "@/states/auth";

const useRequests = () => {
  const hasActions = true;
  const [tableData, setTableData] = useState<any[]>([]);
  const [requestDetails, setRequestDetails] = useState<any[]>([]);

  const [loading, setLoading] = useState<boolean>(false);
  const { authState } = useAuthContext();
  const siteId = authState.user?.siteid || 0;
  const token = authState.user?.token || "";

  const columns = {
    refNo: "Request",
    isApprovedByPm: "PM Approved",
    status: "Status",
    date: "Date",
    ordered_percent: "Ordered %",
    deliv_percent: "Deliv.%",
  };

  const previewColumns = {
    itemName: "Item",
    itemUnit: "Unit",
    code: "Cost Code",
    quantity: "Requested Qty",
    ordered_qty: "Ordered Qty",
    delivered_qty: "Delivered Qty",
  };

  const inputFields: any[] = [];

  const getRequestDetails = async (materialId: number) => {
    setLoading(true);
    try {
      const response = await apiRequest(
        `Requests/requestdetails/${materialId}`,
        "GET",
        token ?? ""
      );
      setRequestDetails(response);
      return response;
    } catch (error) {
      console.error("Error fetching request details:", error);
      throw error; // Re-throw the error so calling code can handle it if needed
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);

    if (siteId && siteId > 0 && token) {
      apiRequest(`Requests/listrequests/${siteId}`, "GET", token)
        .then((res: any[]) => {
          const formattedRes = res.map((item) => ({
            ...item,
            isApprovedByPm: item.isApprovedByPm ? "Approved" : "-",
            date: new Date(item.date).toLocaleDateString("en-GB"),
          }));

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
    previewColumns,
    requestDetails,
    getRequestDetails,
  };
};

export default useRequests;
