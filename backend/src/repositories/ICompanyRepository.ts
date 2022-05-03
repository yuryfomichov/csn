export type Pagination = {
  offset: number;
  limit: number;
};

export type GetCompaniesQuery = {
  company_query?: string;
  specialities?: string[];
  pagination: Pagination;
};

export type CompanyModel = {
  name: string;
  city: string;
};

export interface ICompanyRepository {
  is_db_exists(): boolean;
  save_db(companies: CompanyModel[]): void;
  get_companies(query: GetCompaniesQuery): Promise<CompanyModel[]>;
}
