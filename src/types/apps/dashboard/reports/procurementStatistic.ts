export type IProcurementStatistic = {
  id: number;
  site: string;
  request: string;
  po: string;
  supplier: string;
  item: string;
  cost_code: string;
  unit: string;
  unit_price: number;
  qty: number;
  amount: number;
  status: string;
  deliv_percent: number;
  billed_percent: number;
  date_po: Date;
};
