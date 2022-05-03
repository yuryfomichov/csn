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
    return fs.readJson(DB_LOCATION);
  }
}

export { CompanyJsonRepository };
