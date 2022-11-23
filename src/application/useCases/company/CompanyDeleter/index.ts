import { Company } from '@domain/entities/Company'
import { CompanyRepository } from '@domain/repositories/CompanyRepository'
import { CompanyGetterByNit } from '../../../../domain/services/CompanyGetterByNit'

export class CompanyDeleterUseCase {
  private readonly _companyRepository: CompanyRepository
  private readonly _companyGetterByNit: CompanyGetterByNit

  constructor (companyRepository: CompanyRepository) {
    this._companyRepository = companyRepository
    this._companyGetterByNit = new CompanyGetterByNit(companyRepository)
  }

  async run (nit: string): Promise<Company> {
    const companyToDelete = await this._companyGetterByNit.run(nit)

    await this._companyRepository.delete(nit)

    return companyToDelete
  }
}