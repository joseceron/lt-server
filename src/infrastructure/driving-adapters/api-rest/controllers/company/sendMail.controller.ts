import { NextFunction, Request, Response } from 'express'

import { SendGridSender } from '../../../../SendGridHandler'
import fs from 'fs'
import { join } from 'path'
import sgMail from '@sendgrid/mail'

export const sendMail = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const sendgridSender = new SendGridSender()

  try {
    const apiKey: any = process.env.SENDGRID_API_KEY
    sgMail.setApiKey(apiKey)
    const pathToAttachment = join(__dirname, 'table.pdf')
    const attachment = fs.readFileSync(pathToAttachment).toString('base64')

    const message = {
      to: 'joseluisceron13@gmail.com',
      from: 'contacto@goguau.co',
      subject: 'Lite Thinking - File',
      text: 'Company consolidate file',
      attachments: [
        {
          content: attachment,
          filename: 'table.pdf',
          type: 'application/pd',
          disposition: 'attachment'
        }
      ]
    }
    const mailSent = await sendgridSender.send(message)
    res.json(mailSent)
    return
  } catch (e) {
    return next(e)
  }
}
