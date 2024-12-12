import { useState } from "react";

const usePaymentOrders = () => {
  const [hasActions, _] = useState<boolean>(true);

  const columns = {
    id: "ID",
    pay_o: "PayO",
    po: "PO",
    request: "Request",
    supplier: "Supplier",
    supplier_bl: "Supplier BL",
    po_amount: "PO Amount",
    deliv_percent: "Deliv. %",
    billed_percent: "Billed %",
    pay_order_amount: "PayOrder Amount",
  };

  const tableData = [
    {
      id: "1",
      pay_o: "PayO-A16-0056",
      po: "PO-A16-0036-CM",
      request: "REQ-A16-0023-CM",
      supplier: "CHEHAB OFF SHORE LTD",
      supplier_bl: "FACTURE N°26",
      po_amount: "2,480,243",
      deliv_percent: "100.00%",
      billed_percent: "0.87%",
      pay_order_amount: "316,907",
    },
    {
      id: "2",
      pay_o: "PayO-A16-0056",
      po: "PO-A16-0036-CM",
      request: "REQ-A16-0023-CM",
      supplier: "CHEHAB OFF SHORE LTD",
      supplier_bl: "FACTURE N°26",
      po_amount: "2,480,243",
      deliv_percent: "100.00%",
      billed_percent: "0.87%",
      pay_order_amount: "316,907",
    },
    {
      id: "3",
      pay_o: "PayO-A16-0056",
      po: "PO-A16-0036-CM",
      request: "REQ-A16-0023-CM",
      supplier: "CHEHAB OFF SHORE LTD",
      supplier_bl: "FACTURE N°26",
      po_amount: "2,480,243",
      deliv_percent: "100.00%",
      billed_percent: "0.87%",
      pay_order_amount: "316,907",
    },
    {
      id: "4",
      pay_o: "PayO-A16-0056",
      po: "PO-A16-0036-CM",
      request: "REQ-A16-0023-CM",
      supplier: "CHEHAB OFF SHORE LTD",
      supplier_bl: "FACTURE N°26",
      po_amount: "2,480,243",
      deliv_percent: "100.00%",
      billed_percent: "0.87%",
      pay_order_amount: "316,907",
    },
    {
      id: "5",
      pay_o: "PayO-A16-0056",
      po: "PO-A16-0036-CM",
      request: "REQ-A16-0023-CM",
      supplier: "CHEHAB OFF SHORE LTD",
      supplier_bl: "FACTURE N°26",
      po_amount: "2,480,243",
      deliv_percent: "100.00%",
      billed_percent: "0.87%",
      pay_order_amount: "316,907",
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

export default usePaymentOrders;
