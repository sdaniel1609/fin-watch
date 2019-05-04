export interface Crypto {
  cryptoPair: string;
  exchange: string;
  cryptoPrice: CryptoPrice [];
}

export interface CryptoPrice extends Crypto {
  time: Date;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}
