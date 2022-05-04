export type Pagination = {
  offset: number;
  limit: number;
};

export type Ordering = {
  field: string;
  direction: "asc" | "desc";
};

export type GetCompaniesQuery = {
  company_query?: string;
  specialities?: Specialities[];
  pagination: Pagination;
  ordering: Ordering;
};

export enum Specialities {
  Plumbing = "plumbing",
  Electrical = "electrical",
  Painting = "painting",
  Carpentry = "carpentry",
  Cleaning = "cleaning",
}

export type CompanyModel = {
  id: number;
  name: string;
  city: string;
  logo: string;
  specialities: Specialities[];
};

export interface ICompanyRepository {
  is_db_exists(): boolean;
  save_db(companies: CompanyModel[]): void;
  get_companies(query: GetCompaniesQuery): Promise<CompanyModel[]>;
  get_companies_count(query: GetCompaniesQuery): Promise<number>;
}
