import { Router } from 'express'
import { auth } from '../middleware/auth'

import {
  createCompanyController,
  getAllCompaniesController,
  deleteCompanyController,
  updateCompanyController
} from '../controllers/company/index'

const route = Router()

route.post('', auth, createCompanyController)
route.get('', auth, getAllCompaniesController)
route.delete('/:nit', auth, deleteCompanyController)
route.put('/:nit', auth, updateCompanyController)

export default route