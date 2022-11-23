import { NextFunction, Response } from 'express'

import { DynamoDBCompanyRepository } from '../../../../implementations/Aws/dynamo-db/DynamoDBCompanyRepository'
import { CompanyGetterUseCase } from '../../../../../application/useCases/company/CompanyGetter'

export const getAllCompanies = async (req: any, res: Response, next: NextFunction): Promise<void> => {
  const dynamoDBCompanyRepo = new DynamoDBCompanyRepository()
  const companyGetterUseCase = new CompanyGetterUseCase(dynamoDBCompanyRepo)

  try {
    const companies = await companyGetterUseCase.run()
    res.json(companies)
    return
  } catch (e) {
    return next(e)
  }
}