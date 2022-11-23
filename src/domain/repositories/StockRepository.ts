import { Stock } from '../entities/Stock'

export interface StockRepository {
  save: (stock: Stock) => Promise<Stock>
  getByCompanyNit: (nit: string) => Promise<Stock[]>
  getByCompanyNitAndName: (nit: string, name: string) => Promise<Stock | null>
}