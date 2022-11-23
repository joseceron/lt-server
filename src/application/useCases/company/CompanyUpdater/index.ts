import { Company } from '@domain/entities/Company'
import { CompanyRepository } from '@domain/repositories/CompanyRepository'
import { CompanyGetterByNit } from '../../../../domain/services/CompanyGetterByNit'

export class CompanyUpdaterUseCase {
  private readonly _companyRepository: CompanyRepository
  private readonly _companyGetterByNit: CompanyGetterByNit

  constructor (companyRepository: CompanyRepository) {
    this._companyRepository = companyRepository
    this._companyGetterByNit = new CompanyGetterByNit(companyRepository)
  }

  async run (data: Company): Promise<Company> {
    const company = await this._companyGetterByNit.run(data.nit)

    const dataToUpdate: Company = {
      nit: data.nit,
      name: data.name ?? company.name,
      address: data.address ?? company.address,
      phone: data.phone ?? company.phone,
    }

    const companyUpdated: Company = await this._companyRepository.update(dataToUpdate)
    return companyUpdated
  }
}