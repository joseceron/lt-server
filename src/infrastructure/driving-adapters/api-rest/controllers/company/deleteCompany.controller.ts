import { NextFunction, Request, Response } from 'express'
import { CompanyDeleterUseCase } from '../../../../../application/useCases/company/CompanyDeleter'
import { DynamoDBCompanyRepository } from '../../../../implementations/Aws/dynamo-db/DynamoDBCompanyRepository'

export const deleteCompany = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const companyNit = req.params.nit

  const dynamoDBCompanyRepo = new DynamoDBCompanyRepository()
  const companyDeleterUseCase = new CompanyDeleterUseCase(dynamoDBCompanyRepo)

  try {
    const companyDeleted = await companyDeleterUseCase.run(companyNit)
    res.status(204).json(companyDeleted)
    return
  } catch (e) {
    return next(e)
  }
}