import { Stock } from 'domain/entities/Stock'
import { StockRepository } from 'domain/repositories/StockRepository'
import { DynamoDB } from '../../../driven-adapters/AWS/dynamo-db'

export class DynamoDBStockRepository implements StockRepository {
  private readonly _db = DynamoDB.getInstance()
  private readonly _LIMIT_ITEMS = 5

  async save (stock: Stock): Promise<Stock> {
    await this._db.put({
      TableName: DynamoDB.STOCK_TABLE_NAME,
      Item: {
        company_nit_pk: stock.company_nit,
        name_sk: stock.name,
        quantity: stock.quantity,
      }
    }).promise()

    return stock
  }

  async getByCompanyNit (nit: string): Promise<Stock[]> {
    const response = await this._db.scan({
      TableName: DynamoDB.STOCK_TABLE_NAME,
      FilterExpression: '#pk = :pk',
      ExpressionAttributeNames: {
        '#pk': 'company_nit_pk',
      },
      ExpressionAttributeValues: {
        ':pk': nit
      }
    }).promise()

    const items = (response.Items != null) ? response.Items : []

    if (items.length === 0) return []

    const stocks = items.map((item: any) => {
      const nitItem: string = item.company_nit_pk ?? ''
      const name: string = item.name_sk ?? ''
      const quantity: number = item.quantity ?? ''
    
      const stock: Stock = {
        company_nit: nitItem,
        name,
        quantity
      }
      return stock
    })

    return stocks
  }

  async getByCompanyNitAndName (nit: string, name: string): Promise<Stock | null> {
    const response = await this._db.scan({
      TableName: DynamoDB.STOCK_TABLE_NAME,
      FilterExpression: '#pk = :pk AND #sk = :sk',
      ExpressionAttributeNames: {
        '#pk': 'company_nit_pk',
        '#sk': 'name_sk'
      },
      ExpressionAttributeValues: {
        ':pk': nit,
        ':sk': name
      }
    }).promise()

    const item = (response.Items !== undefined) ? response.Items[0] : undefined

    if (item === undefined) return null

    const company_nit: string = item.company_nit_pk ?? ''
    const stock_name: string = item.name_sk ?? ''
    const quantity: number = item.quantity ?? 0

    const stock: Stock = {
      company_nit,
      name: stock_name,
      quantity
    }

    return stock
  }

}