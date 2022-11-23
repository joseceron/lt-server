import { Stock } from '@domain/entities/Stock'
import { StockRepository } from '@domain/repositories/StockRepository'

export class StockGetterByNitUseCase {
  private readonly _stockRepository: StockRepository

  constructor(stockRepository: StockRepository) {
    this._stockRepository = stockRepository
  }

  async run (nit: string): Promise<Stock[] | null> {
    const stocks = await this._stockRepository.getByCompanyNit(nit)

    if(stocks === null) return []
    return stocks
  }
}