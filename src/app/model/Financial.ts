import {BaseFinancial} from './BaseFinancial';

export class Financial implements BaseFinancial {
  standardized_financials: StandardizedFinancialsItem[];
  fundamental: Fundamental;

  constructor(financial: Financial) {
    this.standardized_financials = financial.standardized_financials;
    this.fundamental = financial.fundamental;
  }
}

interface StandardizedFinancialsItem {
  data_tag: DataTag;
  value: number;
}
interface DataTag {
  id: string;
  name: string;
  tag: string;
  parent: string | null;
  sequence: number;
  factor: string;
  balance: string | null;
  unit: string;
}
interface Fundamental {
  id: string;
  statement_code: string;
  fiscal_year: number;
  fiscal_period: string;
  type: string;
  start_date: string;
  end_date: string;
  filing_date: string;
}
