import randomWords from "random-words";
import {
  CompanyModel,
  GetCompaniesQuery,
  ICompanyRepository,
  Specialities,
} from "../repositories/ICompanyRepository";

const get_random_specialities = (): Specialities[] => {
  const specialities = [
    Specialities.Plumbing,
    Specialities.Electrical,
    Specialities.Painting,
    Specialities.Carpentry,
    Specialities.Cleaning,
  ];
  const random_specialities: Specialities[] = [];
  for (let i = 0; i < Math.floor(Math.random() * 5) + 1; i++) {
    const random_speciality =
      specialities[Math.floor(Math.random() * specialities.length)];
    if (!random_specialities.includes(random_speciality)) {
      random_specialities.push(random_speciality);
    }
  }
  return random_specialities;
};

class CompanyService {
  constructor(private repository: ICompanyRepository) {}
  generate_db() {
    if (!this.repository.is_db_exists()) {
      console.log("DB is not found, generating random DB");
      const companies: CompanyModel[] = [];
      for (let i = 1; i <= 1000; i++) {
        companies.push({
          id: i,
          name: randomWords(2).join(" "),
          city: randomWords(1).join(" "),
          logo: "http://placekitten.com/g/24/24",
          specialities: get_random_specialities(),
        });
      }
      this.repository.save_db(companies);
    }
  }
  async get_companies(query: GetCompaniesQuery): Promise<CompanyModel[]> {
    return await this.repository.get_companies(query);
  }
  async get_companies_count(query: GetCompaniesQuery): Promise<number> {
    return await this.repository.get_companies_count(query);
  }
}

export { CompanyService };
