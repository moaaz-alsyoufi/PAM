import { useState, useEffect } from "react";
import apiRequest from "@/services/api/api";
import { useAuthContext } from "@/states/auth";

const useRequests = () => {
  const hasActions = true;
  const [tableData, setTableData] = useState<any[]>([]);
  const [requestDetails, setRequestDetails] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const [newRequestRefNumber, setNewRequestRefNumber] = useState<string>("");
  const [subContractors, setSubContractors] = useState<any[]>([]);
  const [costCodes, setCostCodes] = useState<any[]>([]);
  const [searchedItems, setSearchedItems] = useState<any[]>([]);

  const { authState } = useAuthContext();
  const siteId = authState.user?.siteid || 0;
  const token = authState.user?.token || "";

  interface Column {
    key: string;
    label: string;
    isInput?: boolean;
    required?: boolean;
    inputType?: string; // e.g., "text", "number", "date", etc.
    disabled?: boolean;
  }

  const columns = {
    refNo: "Request",
    isApprovedByPm: "PM Approved",
    status: "Status",
    date: "Date",
    ordered_percent: "Ordered %",
    deliv_percent: "Deliv.%",
  };

  const newRequestColumns: Column[] = [
    {
      key: "category",
      label: "Category",
      isInput: false,
    },
    {
      key: "itemName",
      label: "Item",
      isInput: true,
      required: true,
      inputType: "text",
    },
    {
      key: "itemUnit",
      label: "Unit",
      isInput: true,
      inputType: "text",
      disabled: true,
    },
    {
      key: "code",
      label: "Cost Code",
      isInput: true,
      required: true,
      inputType: "text",
    },
    {
      key: "quantity",
      label: "Qty",
      isInput: true,
      required: true,
      inputType: "number",
    },
  ];

  const previewColumns = {
    itemName: "Item",
    itemUnit: "Unit",
    code: "Cost Code",
    quantity: "Requested Qty",
    ordered_qty: "Ordered Qty",
    delivered_qty: "Delivered Qty",
  };

  const inputFields = [
    { name: "request", label: "Request", type: "text", required: true },
    {
      name: "sub",
      label: "Select Sub",
      type: "select",
      required: true,
      options: ["sub1", "sub2"],
    },
    { name: "remarks", label: "Remarks", type: "text", required: false },
    {
      name: "items",
      label: "Select Item",
      type: "select",
      required: true,
      options: ["item1", "item2"],
    },
    { name: "unit", label: "Unit", type: "text", required: true },
    { name: "costCode", label: "Cost Code", type: "text", required: true },
    { name: "qty", label: "Qty", type: "number", required: true },
  ];

  const getRequestDetails = async (materialId: number) => {
    setLoading(true);
    try {
      const response = await apiRequest(
        `Requests/requestdetails/${materialId}`,
        "GET",
        token
      );
      setRequestDetails(response);
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const getNewRequest = async (siteId: number) => {
    setLoading(true);
    try {
      const response = await apiRequest(
        `Requests/newrequest/${siteId}`,
        "GET",
        token
      );
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const exportRequest = async (
    materialId: number | undefined
  ): Promise<Blob> => {
    if (!materialId) {
      throw new Error("Material ID is undefined");
    }
    return await apiRequest(
      `Requests/materialrequest/pdf/${materialId}`,
      "GET",
      token,
      undefined,
      "blob"
    );
  };

  const fetchNewRequestData = async () => {
    setLoading(true);
    try {
      const newReqData = await apiRequest(
        `Requests/newrequest/${siteId}`,
        "GET",
        token
      );
      setNewRequestRefNumber(newReqData.refNumber);
      const subs = await apiRequest("Requests/subcontractors", "GET", token);
      setSubContractors(subs);
      const cc = await apiRequest("Requests/costcodes", "GET", token);
      setCostCodes(cc);
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const searchItems = async (searchTerm: string) => {
    setLoading(true);
    try {
      const response = await apiRequest(
        `Requests/searchitems?searchTerm=${encodeURIComponent(searchTerm)}`,
        "GET",
        token
      );
      setSearchedItems(response);
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const createNewRequest = async (remarks: string, items: any[]) => {
    setLoading(true);
    try {
      const payload = { remarks, items };
      const response = await apiRequest(
        `Requests/createnewrequest/${siteId}`,
        "POST",
        token,
        payload
      );
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

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
          setTableData(formattedRes);
        })
        .catch((error) => {
          console.error(error);
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
    previewColumns,
    newRequestColumns,
    tableData,
    requestDetails,
    inputFields,
    hasActions,
    loading,
    newRequestRefNumber,
    subContractors,
    costCodes,
    searchedItems,
    getRequestDetails,
    getNewRequest,
    exportRequest,
    fetchNewRequestData,
    searchItems,
    createNewRequest,
  };
};

export default useRequests;
