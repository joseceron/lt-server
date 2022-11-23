import { Router } from 'express'
import { auth } from '../middleware/auth'

import {
  createStockController,
  getStockByNitController
} from '../controllers/stock/index'

const route = Router()

route.post('', auth, createStockController)
route.get('/:company_nit', auth, getStockByNitController)

export default route