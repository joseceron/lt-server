export interface MailMessage {
  to: string
  from: string
  subject: string
  text: string
  attachments: any[]
}
