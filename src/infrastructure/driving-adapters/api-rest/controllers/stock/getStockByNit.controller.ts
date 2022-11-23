import { NextFunction, Request, Response } from 'express'

import { DynamoDBStockRepository } from '../../../../implementations/Aws/dynamo-db/DynamoDBStockRepository'
import { StockGetterByNitUseCase } from '../../../../../application/useCases/stock/StockGetterByNit'

export const getStockByNit = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const company_nit = req.params.company_nit

  const dynamoDBStockRepo = new DynamoDBStockRepository()
  const stockGetterByNitUserCase = new StockGetterByNitUseCase(dynamoDBStockRepo)

  try {
    const stocks = await stockGetterByNitUserCase.run(company_nit)
    res.json(stocks)
  } catch (e) {
    return next(e)
  }
}