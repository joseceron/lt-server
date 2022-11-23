import { Exception } from './Exception'

export class StockAlreadyExistsException extends Exception {
  constructor () {
    super('Stock already exists')
    this.spanishMessage = 'El stock ya existe'
  }
}
