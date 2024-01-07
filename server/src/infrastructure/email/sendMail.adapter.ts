import { type Transporter, createTransport } from 'nodemailer'
import { config } from '../../../config/env.file'
import { type InfoMail } from '../../domain/entities/mail.entity'

export class EmailAdapter {
  private readonly transporter: Transporter

  constructor () {
    this.transporter = createTransport({
      service: 'gmail',
      secure: true,
      port: 465,
      auth: {
        user: config.smtpEmail,
        pass: config.smtpPassword
      }
    })
  }

  public async sendMail ({ infoMail }: { infoMail: InfoMail }): Promise<{ message: string }> {
    await this.transporter.sendMail(infoMail)
    return {
      message: 'Mensaje enviado'
    }
  }
}
export const nodemailerEmailAdapater = new EmailAdapter()
