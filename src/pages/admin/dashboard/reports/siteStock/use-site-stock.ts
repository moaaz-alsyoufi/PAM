import { useState } from "react";

const useSiteStock = () => {
  const [hasActions, _] = useState<boolean>(false);

  const columns = {
    id: "ID",
    category: "Category",
    item: "Item",
    unit: "Unit",
    qte_requested: "Qty Requested",
    qte_ordered: "Qty Ordered",
    qte_received: "Qty Received",
    qte_consumed: "Qty Consumed",
    qte_remaining: "Qty Remaining",
  };
  const tableData = [
    {
      id: "1",
      category: "Acier Constr.",
      item: "TIREFOND",
      unit: "U",
      qte_requested: "30.00",
      qte_ordered: "30.00",
      qte_received: "30.00",
      qte_consumed: "30.00",
      qte_remaining: "0.00",
    },
    {
      id: "2",
      category: "Acier Constr.",
      item: "TIREFOND",
      unit: "U",
      qte_requested: "30.00",
      qte_ordered: "30.00",
      qte_received: "30.00",
      qte_consumed: "30.00",
      qte_remaining: "0.00",
    },
    {
      id: "3",
      category: "Acier Constr.",
      item: "TIREFOND",
      unit: "U",
      qte_requested: "30.00",
      qte_ordered: "30.00",
      qte_received: "30.00",
      qte_consumed: "30.00",
      qte_remaining: "0.00",
    },
    {
      id: "4",
      category: "Acier Constr.",
      item: "TIREFOND",
      unit: "U",
      qte_requested: "30.00",
      qte_ordered: "30.00",
      qte_received: "30.00",
      qte_consumed: "30.00",
      qte_remaining: "0.00",
    },
    {
      id: "5",
      category: "Acier Constr.",
      item: "TIREFOND",
      unit: "U",
      qte_requested: "30.00",
      qte_ordered: "30.00",
      qte_received: "30.00",
      qte_consumed: "30.00",
      qte_remaining: "0.00",
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

export default useSiteStock;
