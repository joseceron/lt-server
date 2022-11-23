import { Exception } from './Exception'

export class CompanyNotFoundException extends Exception {
  constructor () {
    super('Company not found')
    this.spanishMessage = 'Empresa no encontrada'
  }
}
