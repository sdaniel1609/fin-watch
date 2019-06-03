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

  getIndexPriceChange(period: number) {
    let historicalPeriod = period;
    let historicalPrice = this.historicalStockPrices[historicalPeriod].value;

    if (historicalPrice === null) {
      historicalPeriod = historicalPeriod + 1;
      historicalPrice = this.historicalStockPrices[historicalPeriod].value;
    }

    const difference = this.currentStockPrice - historicalPrice
    const change = difference / this.currentStockPrice;
    return change;
  }

}



export interface HistoricalData {
  date: Date;
  value: number;
}
