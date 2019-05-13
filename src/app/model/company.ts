export class Company {
  name: string;
  ticker: string;
  currentStockPrice: number;
  historicalStockPrices: any[];

  constructor(name: string, ticker: string, currentStockPrice: number, historicalStockPrices: number[]) {
    this.name = name;
    this.ticker = ticker;
    this.currentStockPrice = currentStockPrice;
    this.historicalStockPrices = historicalStockPrices;
}

  getStockPriceChange(period: number) {
    const difference = this.historicalStockPrices[0].close - this.historicalStockPrices[period].close;
    const change = difference / this.historicalStockPrices[0].close
    return change;
  }
}
