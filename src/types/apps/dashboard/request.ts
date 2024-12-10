export type IRequest = {
  id: number;
  request: string;
  pm_approved: boolean;
  status: string;
  date: Date;
  ordered_percent: number;
  deliv_percent: number;
};
