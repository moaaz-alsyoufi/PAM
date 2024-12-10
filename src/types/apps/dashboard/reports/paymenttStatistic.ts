export type IPaymentStatistic = {
  id: number;
  site: string;
  po: string;
  pay_o: string;
  supplier: string;
  supplier_inv: string;
  item: string;
  unit: string;
  unit_price: number;
  cost_code: string;
  pay_o_qte: number;
  amount: number;
  pay_o_date: Date;
  received: number;
  supplier_bi: string;
};
