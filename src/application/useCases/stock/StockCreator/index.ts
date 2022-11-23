import { Stock } from '@domain/entities/Stock'
import { StockRepository } from '@domain/repositories/StockRepository'
import { ExistsStockByNitAndName } from '../../../../domain/services/ExistsStockByNitAndName'
import { StockAlreadyExistsException } from '../../../../domain/exceptions/StockAlreadyExistsException' 

interface StockInput {
  company_nit: string,
  name: string,
  quantity: number
}

export class StockCreatorUseCase {
  private readonly _stockRepository: StockRepository
  private readonly _existsStockByNitAndName: ExistsStockByNitAndName

  constructor(stockRepository: StockRepository) {
    this._stockRepository = stockRepository
    this._existsStockByNitAndName = new ExistsStockByNitAndName(stockRepository)
  }

  async run (body: StockInput) {
    //  TODO: add field validation is someone is missing

    const stock: Stock = {
      company_nit: body.company_nit,
      name: body.name,
      quantity: body.quantity
    }
    // TODO: validate if the company id exists
    const existsStock: boolean = await this._existsStockByNitAndName.run(body.company_nit, body.name)
    if (existsStock) throw new StockAlreadyExistsException()

    const stockCreated: Stock = await this._stockRepository.save(stock)
    return stockCreated
  }
}