import { CompanyJsonRepository } from "./repositories/CompanyJsonRepository";
import { ICompanyRepository } from "./repositories/ICompanyRepository";
import { CompanyService } from "./services/CompanyService";

const companyRepository: ICompanyRepository = new CompanyJsonRepository();

export function getCompanyService(): CompanyService {
  return new CompanyService(companyRepository);
}
