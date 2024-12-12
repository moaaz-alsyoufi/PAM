import { useState } from "react";

const usePurchaseOrders = () => {
  const [hasActions, _] = useState<boolean>(true);

  const columns = {
    id: "ID",
    po: "PO",
    request: "Request",
    supplier: "Supplier",
    status: "Status",
    date: "Date",
    deliv_percent: "Deliv.%",
    billed_percent: "Billed %",
  };

  const tableData = [
    {
      id: "1",
      po: "PO-A16-0037-CM	",
      request: "REQ-A16-0026-CM	",
      supplier: "G2B",
      status: "Approved",
      date: "26-11-2024	",
      deliv_percent: "0.00%",
      billed_percent: "0.00%",
    },
    {
      id: "2",
      po: "PO-A16-0037-CM	",
      request: "REQ-A16-0026-CM	",
      supplier: "G2B",
      status: "Approved",
      date: "26-11-2024	",
      deliv_percent: "0.00%",
      billed_percent: "0.00%",
    },
    {
      id: "3",
      po: "PO-A16-0037-CM	",
      request: "REQ-A16-0026-CM	",
      supplier: "G2B",
      status: "Approved",
      date: "26-11-2024	",
      deliv_percent: "0.00%",
      billed_percent: "0.00%",
    },
    {
      id: "4",
      po: "PO-A16-0037-CM	",
      request: "REQ-A16-0026-CM	",
      supplier: "G2B",
      status: "Approved",
      date: "26-11-2024	",
      deliv_percent: "0.00%",
      billed_percent: "0.00%",
    },
    {
      id: "5",
      po: "PO-A16-0037-CM	",
      request: "REQ-A16-0026-CM	",
      supplier: "G2B",
      status: "Approved",
      date: "26-11-2024	",
      deliv_percent: "0.00%",
      billed_percent: "0.00%",
    },
  ];

  const inputFields: any[] = [];

  return {
    columns,
    tableData,
    inputFields,
    hasActions,
  };
};

export default usePurchaseOrders;
