import { createCompany } from './createCompany.controller'
import { getAllCompanies } from './getAllCompanies.controller'
import { deleteCompany } from './deleteCompany.controller'
import { updateCompany } from './updateCompany.controller'
import { sendMail } from './sendMail.controller'

export {
  createCompany as createCompanyController,
  getAllCompanies as getAllCompaniesController,
  deleteCompany as deleteCompanyController,
  updateCompany as updateCompanyController,
  sendMail as sendMailController
}