import AWS from '../aws'

export class DynamoDB {
  static USER_TABLE_NAME: string = 'lt-user'
  static USER_SESSIONS_TABLE_NAME: string = 'lt-user-sessions'
  static COMPANY_TABLE_NAME: string = 'lt-company'

  private static _INSTANCE: AWS.DynamoDB.DocumentClient

  static getInstance (options?: AWS.DynamoDB.ClientConfiguration): AWS.DynamoDB.DocumentClient {
    if (this._INSTANCE === undefined) {
      this._INSTANCE = new AWS.DynamoDB.DocumentClient(options)
    }

    return this._INSTANCE
  }
}
