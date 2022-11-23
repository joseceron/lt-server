import { NextFunction, Request, Response } from 'express'

import { DynamoDBStockRepository } from '../../../../implementations/Aws/dynamo-db/DynamoDBStockRepository'
import { StockCreatorUseCase } from '../../../../../application/useCases/stock/StockCreator'

export const createStock = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const {
    company_nit,
    name,
    quantity,
  } = req.body

  const dynamoDBStockRepo = new DynamoDBStockRepository()
  const stockCreatorUseCase = new StockCreatorUseCase(dynamoDBStockRepo)

  try {
    const stockCreated = await stockCreatorUseCase.run({
      company_nit,
      name,
      quantity,
    })

    res.status(201).json(stockCreated)
    return
  } catch (e) {
    return next(e)
  }
}