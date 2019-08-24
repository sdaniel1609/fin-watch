export interface IStockPrice {
  date: Date;
  intraperiod: boolean;
  frequency: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  adj_open: number;
  adj_high: number;
  adj_low: number;
  adj_close: number;
  adj_volume: number;
}
