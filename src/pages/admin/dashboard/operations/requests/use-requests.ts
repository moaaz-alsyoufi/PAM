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
  const [items, setItems] = useState<any[]>([]);

  const { authState } = useAuthContext();
  const siteId = authState.user?.siteid || 0;
  const token = authState.user?.token || "";

  interface Column {
    key: string;
    label: string;
    isInput?: boolean;
    required?: boolean;
    inputType?: string;
    disabled?: boolean;
    options?: any[];
  }

  const columns = {
    refNo: "Request",
    isApprovedByPm: "PM Approved",
    status: "Status",
    date: "Date",
    orderPercent: "Ordered %",
    deliveredPercent: "Deliv.%",
  };

  const newRequestColumns: Column[] = [
    {
      key: "itemName",
      label: "Item",
      isInput: true,
      required: true,
      inputType: "select",
      options: items,
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
      inputType: "number",
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

  const costCodeColumns = {
    en: "EN",
    fr: "FR",
    code: "Code",
  };

  const getRequests = async () => {
    apiRequest(`Requests/listrequests/${siteId}`, "GET", token)
      .then((res: any[]) => {
        const formattedRes = res
          .map((item) => ({
            ...item,
            isApprovedByPm: item.isApprovedByPm ? "Approved" : "-",
            orderPercent: `${Number(item.orderPercent).toFixed(2)}%`,
            deliveredPercent: `${Number(item.deliveredPercent).toFixed(2)}%`,
            date: new Date(item.date).toLocaleDateString("en-GB"),
          }))
          .sort((a, b) =>
            b.refNo.localeCompare(a.refNo, undefined, {
              numeric: true,
              sensitivity: "base",
            })
          );

        setTableData(formattedRes);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

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

  const getCostCodes = async () => {
    try {
      const cc = apiRequest("Requests/costcodes", "GET", token);
      return cc;
    } catch (error) {
      console.error(error);
    }
  };

  const getSubcontractors = async () => {
    try {
      const cc = apiRequest("Requests/subcontractors", "GET", token);
      return cc;
    } catch (error) {
      console.error(error);
    }
  };

  const fetchNewRequestData = async () => {
    try {
      const newReqData = await apiRequest(
        `Requests/newrequest/${siteId}`,
        "GET",
        token
      );

      setNewRequestRefNumber(newReqData.refNumber);
      const subs = await getSubcontractors();
      setSubContractors(subs);
      const cc = await getCostCodes();
      setCostCodes(cc);
      const itms = await apiRequest("Requests/getitems", "GET", token);
      setItems(itms);
      return {
        subs: subs,
        cc: cc,
        itms: itms,
        requestRefNb: newReqData,
      };
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
    }
  };

  const createNewRequest = async (data: any) => {
    setLoading(true);
    try {
      const response = await apiRequest(
        `Requests/createnewrequest/${siteId}`,
        "POST",
        token,
        data
      );
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const approveRequest = async (materialId: number) => {
    setLoading(true);
    try {
      const response = await apiRequest(
        `Requests/approve/${materialId}`,
        "POST",
        token,
        materialId
      );
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const rejectRequest = async (materialId: number, rejectionNote: string) => {
    setLoading(true);

    try {
      const response = await apiRequest(
        `Requests/reject/${materialId}?RejectionNote=${rejectionNote}`,
        "POST",
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

  useEffect(() => {
    setLoading(true);
    if (siteId > 0 && token) {
      getRequests();
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
    items,
    costCodeColumns,
    getRequests,
    getRequestDetails,
    getNewRequest,
    exportRequest,
    fetchNewRequestData,
    createNewRequest,
    approveRequest,
    rejectRequest,
    getCostCodes,
    getSubcontractors,
  };
};

export default useRequests;
