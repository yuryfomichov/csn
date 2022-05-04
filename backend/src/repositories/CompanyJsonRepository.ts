import {
  CompanyModel,
  GetCompaniesQuery,
  ICompanyRepository,
} from "./ICompanyRepository";

import fs from "fs-extra";

const DB_LOCATION = "/db/db.json";

class CompanyJsonRepository implements ICompanyRepository {
  constructor() {}
  is_db_exists(): boolean {
    return fs.existsSync(DB_LOCATION);
  }
  async save_db(companies: CompanyModel[]) {
    fs.writeFile(DB_LOCATION, JSON.stringify(companies), (err) => {
      if (err) {
        console.error(err);
      }
    });
  }
  async get_companies(query: GetCompaniesQuery): Promise<CompanyModel[]> {
    const db: CompanyModel[] = await fs.readJson(DB_LOCATION);
    let result = db;
    if (query.company_query) {
      result = result.filter((company) =>
        company.name.includes(query.company_query!)
      );
    }
    result = result.slice(query.pagination.offset, query.pagination.limit);
    return result;
  }
}

export { CompanyJsonRepository };
