import { SendGridHandler } from '@domain/utils/sendGridHandler'
import sgMail from '@sendgrid/mail'
import { MailMessage } from '@domain/entities/MailMessage'

export class SendGridSender implements SendGridHandler {
  async send(msg: MailMessage): Promise<boolean> {   
    await sgMail.send(msg)
    return true
  }
}