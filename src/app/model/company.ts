export class Company {
  name: string;
  ticker: string;
  stock_prices: any[];

  constructor(name: string, ticker: string, stock_prices: number[]) {
    this.name = name;
    this.ticker = ticker;
    this.stock_prices = stock_prices;
}
}
