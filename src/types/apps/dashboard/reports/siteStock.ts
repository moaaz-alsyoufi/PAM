export type ISiteStock = {
  id: number;
  category: string;
  item: string;
  unit: string;
  qte_requested: number;
  qte_ordered: number;
  qte_received: number;
  qte_consumed: number;
  qte_remaining: number;
};
