import { NextFunction, Request, Response } from 'express'

import { SendGridSender } from '../../../../SendGridHandler'
import fs from 'fs'
const sgMail = require('@sendgrid/mail');

export const sendMail = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

  const sendgridSender = new SendGridSender()
  
  try {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const pathToAttachment = `${__dirname}/table.pdf`
    const attachment = fs.readFileSync(pathToAttachment).toString("base64");

    const message = {
      to: 'joseluisceron13@gmail.com',
      from: 'contacto@goguau.co',
      subject: 'Lite Thinking - File',
      text: 'Company consolidate file',
      attachments: [
        {
          content: attachment,
          filename: "table.pdf",
          type: "application/pdf",
          disposition: "attachment"
        }
      ]
    };    
    const mailSent = await sendgridSender.send(message)
    res.json(mailSent)
    return
  } catch (e) {
    return next(e)
  }
}