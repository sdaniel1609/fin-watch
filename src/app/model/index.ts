export interface IIndex {
  name: string;
  symbol: string;
}

export interface IIndexValue extends IIndex {
  indexValue: number;
}
