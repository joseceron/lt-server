import { Company } from '../entities/Company'

export interface CompanyRepository {
  save: (company: Company) => Promise<Company>
  getAll: () => Promise<Company[]>
  getByNit: (nit: string) => Promise<Company | null>
  update: (company: Company) => Promise<Company>
  delete: (company: string) => Promise<void>
}