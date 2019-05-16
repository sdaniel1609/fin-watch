export class Index {
  name: string;
  ticker: string;
  currentStockPrice: number;
  historicalStockPrices: HistoricalData[];

  constructor(name: string, ticker: string, currentStockPrice: number, historicalData: HistoricalData[]) {
    this.name = name;
    this.ticker = ticker;
    this.currentStockPrice = currentStockPrice;
    this.historicalStockPrices = historicalData;
  }

  getStockPriceChange(period: number) {
    const difference = this.currentStockPrice - this.historicalStockPrices[period].value;
    const change = difference / this.currentStockPrice;
    return change;
  }
}


export interface HistoricalData {
  date: Date;
  value: number;
}
