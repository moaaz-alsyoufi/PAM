import { useState } from "react";

const useDeliveryNotes = () => {
  const [hasActions, _] = useState<boolean>(false);

  const columns = {
    id: "ID",
    site: "Site",
    delivery_note: "Delivery Note",
    supplier_deliv_note: "Supplier Deliv. Note",
    po: "PO",
    supplier: "Supplier",
    date: "Date",
  };

  const tableData = [
    {
      id: "1",
      site: "MAR-H",
      delivery_note: "BL-A16-0146",
      supplier_deliv_note: "Second delivery - first one was 9 units	",
      po: "PO-A16-0015-CM	",
      supplier: "COLOR CERAMICA Sarl",
      date: "25-Nov.2024",
    },
    {
      id: "2",
      site: "MAR-H",
      delivery_note: "BL-A16-0146",
      supplier_deliv_note: "Second delivery - first one was 9 units	",
      po: "PO-A16-0015-CM	",
      supplier: "COLOR CERAMICA Sarl",
      date: "25-Nov.2024",
    },
    {
      id: "3",
      site: "MAR-H",
      delivery_note: "BL-A16-0146",
      supplier_deliv_note: "Second delivery - first one was 9 units	",
      po: "PO-A16-0015-CM	",
      supplier: "COLOR CERAMICA Sarl",
      date: "25-Nov.2024",
    },
    {
      id: "4",
      site: "MAR-H",
      delivery_note: "BL-A16-0146",
      supplier_deliv_note: "Second delivery - first one was 9 units	",
      po: "PO-A16-0015-CM	",
      supplier: "COLOR CERAMICA Sarl",
      date: "25-Nov.2024",
    },
    {
      id: "5",
      site: "MAR-H",
      delivery_note: "BL-A16-0146",
      supplier_deliv_note: "Second delivery - first one was 9 units	",
      po: "PO-A16-0015-CM	",
      supplier: "COLOR CERAMICA Sarl",
      date: "25-Nov.2024",
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

export default useDeliveryNotes;
