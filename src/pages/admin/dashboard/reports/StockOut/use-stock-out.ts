import { useState, useEffect } from "react";
import apiRequest from "@/services/api/api";
import { useAuthContext } from "@/states/auth";

const useStockOut = () => {
  const [tableData, setTableData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const { authState } = useAuthContext();
  const siteId = authState.user?.siteid || 0;
  const token = authState.user?.token || "";

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

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  useEffect(() => {
    setLoading(true);
    if (siteId > 0 && token) {
      apiRequest(`Stock/GetStockOutStatus/${siteId}`, "GET", token)
        .then((res: any[]) => {
          const mapped = res.map((d, idx) => ({
            id: idx + 1,
            category: d.categoryName,
            item: d.item,
            unit: d.unit,
            qte_requested: formatNumber(d.requested),
            qte_ordered: formatNumber(d.ordered),
            qte_received: formatNumber(d.received),
            qte_consumed: formatNumber(d.consumed),
            qte_remaining: formatNumber(d.received - d.consumed),
          }));
          setTableData(mapped);
        })
        .catch(console.error)
        .finally(() => setLoading(false));
    } else {
      setTableData([]);
      setLoading(false);
    }
  }, [siteId, token]);

  return {
    columns,
    tableData,
    loading,
  };
};

export default useStockOut;