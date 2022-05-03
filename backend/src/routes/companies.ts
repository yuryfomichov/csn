import express, { Request, Response } from "express";
import { body } from "express-validator";
import { getCompanyService } from "../container";
import { CompanyModel } from "../repositories/ICompanyRepository";

const router = express.Router();

router.get(
  "/api/companies",
  [
    body("company_query")
      .trim()
      .isString()
      .optional()
      .withMessage("Should be string"),
    body("specialities.*").isString().withMessage("Should be string"),
  ],
  async (req: Request, res: Response) => {
    const service = getCompanyService();
    const { company_query, specialities } = req.body;

    const companies: CompanyModel[] = await service.get_companies();

    res.status(200).send({
      companies,
    });
  }
);

export { router as companiesRouter };
