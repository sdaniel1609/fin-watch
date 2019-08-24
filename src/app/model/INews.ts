export interface Company {
    id: string;
    ticker: string;
    name: string;
    lei: string;
    cik: string;
  }

  export interface INews {
    id: string;
    title: string;
    publication_date: Date;
    url: string;
    summary: string;
    company: Company;
  }

