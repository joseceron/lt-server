import { Company } from 'domain/entities/Company'
import { CompanyRepository } from 'domain/repositories/CompanyRepository'
import { CompanyNotFoundException } from '../../exceptions/CompanyNotFoundException'

export class CompanyGetterByNit {
  private readonly _companyRepository: CompanyRepository

  constructor (companyRepository: CompanyRepository) {
    this._companyRepository = companyRepository
  }

  async run (nit: string): Promise<Company> {
    const company = await this._companyRepository.getByNit(nit)

    if (company === null) { throw new CompanyNotFoundException() }

    return company
  }
}