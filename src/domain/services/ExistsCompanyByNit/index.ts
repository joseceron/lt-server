import { CompanyRepository } from '@domain/repositories/CompanyRepository'

export class ExistsCompanyByNit {
  private readonly _companyRepository: CompanyRepository

  constructor (companyRepository: CompanyRepository) {
    this._companyRepository = companyRepository
  }

  async run (nit: string): Promise<boolean> {
    const company = await this._companyRepository.getByNit(nit)
    if (company !== null) return true
    return false
  }
}