import { StockRepository } from '@domain/repositories/StockRepository'

export class ExistsStockByNitAndName {
  private readonly _stockRepository: StockRepository

  constructor (stockRepository: StockRepository) {
    this._stockRepository = stockRepository
  }

  async run (nit: string, name: string): Promise<boolean> {
    const stock = await this._stockRepository.getByCompanyNitAndName(nit, name)
    if (stock !== null) return true
    return false
  }
}