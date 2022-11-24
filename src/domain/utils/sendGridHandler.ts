import {MailMessage} from '../entities/MailMessage'

export interface SendGridHandler {
  send: (msg: MailMessage) => Promise<boolean>
}