export class Currency {
  currencyPair: string;
  exchange?: string;
  price: number;
  date: Date;

  constructor(currencyPair: string,  price: number, date: Date, exchange?: string) {
    this.currencyPair = currencyPair;
    this.exchange = exchange;
    this.price = price;
    this.date = date;
  }
}
