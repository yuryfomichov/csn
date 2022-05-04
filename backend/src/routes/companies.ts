import express, { Request, Response } from "express";
import { body } from "express-validator";
import { getCompanyService } from "../container";
import {
  CompanyModel,
  GetCompaniesQuery,
} from "../repositories/ICompanyRepository";

const router = express.Router();

router.post(
  "/api/companies",
  [
    body("company_query")
      .trim()
      .isString()
      .default("")
      .withMessage("Should be string"),
    body("specialities.*")
      .isString()
      .default([])
      .withMessage("Should be string"),
    body("pagination.offset")
      .isInt()
      .default(0)
      .withMessage("Should be number"),
    body("pagination.limit")
      .isInt()
      .default(10)
      .withMessage("Should be number"),
    body("ordering.field")
      .isString()
      .default("name")
      .withMessage("Should be string"),
    body("ordering.direction")
      .isString()
      .default("asc")
      .withMessage("Should be string"),
  ],
  async (req: Request, res: Response) => {
    const service = getCompanyService();
    const { company_query, specialities, pagination, ordering } = req.body;
    const query: GetCompaniesQuery = {
      company_query,
      specialities,
      pagination,
      ordering,
    };
    const companies: CompanyModel[] = await service.get_companies(query);
    const count: number = await service.get_companies_count(query);

    res.status(200).send({
      companies,
      count,
    });
  }
);

export { router as companiesRouter };
