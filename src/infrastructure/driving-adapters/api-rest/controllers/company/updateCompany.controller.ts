import { NextFunction, Request, Response } from 'express'
import { Company } from 'domain/entities/Company'
import { CompanyUpdaterUseCase } from '../../../../../application/useCases/company/CompanyUpdater'
import { DynamoDBCompanyRepository } from '../../../../implementations/Aws/dynamo-db/DynamoDBCompanyRepository'

export const updateCompany = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const {
    name,
    address,
    phone,
  } = req.body

  const companyNit = req.params.nit

  const dynamoDBCompanyRepo = new DynamoDBCompanyRepository()
  const companyUpdaterUseCase = new CompanyUpdaterUseCase(dynamoDBCompanyRepo)

  try {
    const companyToUpdate: Company = {
      nit: companyNit,
      name,
      address,
      phone,
    }

    const company = await companyUpdaterUseCase.run(companyToUpdate)
    res.json(company)
    return
  } catch (e) {
    return next(e)
  }
}
