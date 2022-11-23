import { Company } from '@domain/entities/Company'
import { CompanyRepository } from '@domain/repositories/CompanyRepository'

import { ExistsCompanyByNit } from '../../../../domain/services/ExistsCompanyByNit'
import { CompanyAlreadyExistsException } from '../../../../domain/exceptions/CompanyAlreadyExistsException'

interface CompanyInput {
  nit: string
  name: string
  address: string
  phone: string
}

export class CompanyCreatorUseCase {
  private readonly _companyRepository: CompanyRepository
  private readonly _existsCompanyByNit: ExistsCompanyByNit

  constructor(companyRepository: CompanyRepository) {
    this._companyRepository = companyRepository
    this._existsCompanyByNit = new ExistsCompanyByNit(companyRepository)
  }

  async run (body: CompanyInput): Promise<Company> {
    //TODO: add field validation if someone is missing
    const company: Company = {
      nit: body.nit,
      name: body.name,
      address: body.address,
      phone: body.phone
    }

    const existsCompany: boolean = await this._existsCompanyByNit.run(company.nit!)
    if (existsCompany) throw new CompanyAlreadyExistsException()

    const companyCreated: Company = await this._companyRepository.save(company)
    return companyCreated
  }
}