import {
  CompanyModel,
  GetCompaniesQuery,
  ICompanyRepository,
} from "../repositories/ICompanyRepository";

class CompanyService {
  constructor(private repository: ICompanyRepository) {}
  generate_db() {
    if (!this.repository.is_db_exists()) {
      console.log("DB is not found, generating random DB");
      const companies: CompanyModel[] = [];
      for (let i = 0; i < 1000; i++) {
        companies.push({
          name: `Company ${i}`,
          city: `City ${i}`,
        });
      }
      this.repository.save_db(companies);
    }
  }
  async get_companies(): Promise<CompanyModel[]> {
    return await this.repository.get_companies({
      company_query: "",
    } as GetCompaniesQuery);
  }
}

export { CompanyService };
