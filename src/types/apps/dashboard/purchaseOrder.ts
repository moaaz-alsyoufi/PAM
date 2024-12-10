export type IPurchaseOrder = {
  id: number;
  po: string;
  request: string;
  supplier: string;
  status: string;
  date: Date;
  deliv_percent: number;
  billed_percent: number;
};
