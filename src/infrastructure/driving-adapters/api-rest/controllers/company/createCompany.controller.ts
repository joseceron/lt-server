import { NextFunction, Request, Response } from 'express'
import { DynamoDBCompanyRepository } from '../../../../implementations/Aws/dynamo-db/DynamoDBCompanyRepository'
import { CompanyCreatorUseCase } from '../../../../../application/useCases/company/CompanyCreator'

export const createCompany = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const {
    nit,
    name,
    address,
    phone,
  } = req.body

  const dynamoDBCompanyRepo = new DynamoDBCompanyRepository()
  const companyCreatorUseCase = new CompanyCreatorUseCase(dynamoDBCompanyRepo)

  try {
    const companyCreated = await companyCreatorUseCase.run({
      nit,
      name,
      address,
      phone,
    })

    res.status(201).json(companyCreated)
    return
  } catch (e) {
    return next(e)
  }
}
