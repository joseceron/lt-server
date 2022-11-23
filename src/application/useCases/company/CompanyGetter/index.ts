import { Company } from '@domain/entities/Company'
import { CompanyRepository } from '@domain/repositories/CompanyRepository'

export class CompanyGetterUseCase {
  private readonly _companyRepository: CompanyRepository

  constructor (companyRepository: CompanyRepository) {
    this._companyRepository = companyRepository
  }

  async run (): Promise<Company[]> {
    const companies: Company[] = await this._companyRepository.getAll()

    return companies
  }
}
