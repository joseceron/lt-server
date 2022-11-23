import { Company } from 'domain/entities/Company'
import { CompanyRepository } from 'domain/repositories/CompanyRepository'
import { DynamoDB } from '../../../driven-adapters/AWS/dynamo-db'

export class DynamoDBCompanyRepository implements CompanyRepository {
  private readonly _db = DynamoDB.getInstance()
  private readonly _LIMIT_ITEMS = 5

  async save (company: Company): Promise<Company> {
    await this._db.put({
      TableName: DynamoDB.COMPANY_TABLE_NAME,
      Item: {
        nit_pk: company.nit,
        name: company.name,
        address: company.address,
        phone: company.phone,
      }
    }).promise()

    return company
  }

  async getByNit (nit: string): Promise<Company | null> {
    const response = await this._db.scan({
      TableName: DynamoDB.COMPANY_TABLE_NAME,
      FilterExpression: '#pk = :pk',
      ExpressionAttributeNames: {
        '#pk': 'nit_pk'
      },
      ExpressionAttributeValues: {
        ':pk': nit
      }
    }).promise()

    const item = (response.Items !== undefined) ? response.Items[0] : undefined

    if (item === undefined) return null

    const nitItem: string = item.nit_pk ?? ''
    const name: string = item.name ?? ''
    const address: string = item.address ?? ''
    const phone: string = item.phone ?? ''

    const company: Company = {
      nit: nitItem,
      name,
      address,
      phone
    }

    return company
  }

  async getAll (): Promise<any[]> {
    const response = await this._db.scan({
      TableName: DynamoDB.COMPANY_TABLE_NAME
    }).promise()

    const items = (response.Items != null) ? response.Items : []
    const companies = items.map((item: any) => {
      const nitItem: string = item.nit_pk ?? ''
      const name: string = item.name ?? ''
      const address: string = item.address ?? ''
      const phone: string = item.phone ?? ''
    
      return {
        nit: nitItem,
        name,
        address,
        phone
      }
    })

    return companies
  }

  async delete (nit: string): Promise<void> {
    await this._db.delete({
      TableName: DynamoDB.COMPANY_TABLE_NAME,
      Key: {
        nit_pk: nit,
      }
    }).promise()
  }

  async update (company: Company): Promise<Company> {
    await this._db.update({
      TableName: DynamoDB.COMPANY_TABLE_NAME,
      Key: {
        nit_pk: company.nit,
      },
      UpdateExpression: 'set #n = :name, #a = :address, #p = :phone',
      ExpressionAttributeNames: {
        '#n': 'name',
        '#a': 'address',
        '#p': 'phone',
      },
      ExpressionAttributeValues: {
        ':name': company.name,
        ':address': company.address,
        ':phone': company.phone,
      }
    }).promise()

    return company
  }
}