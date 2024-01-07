import { type InfoMail } from '../entities/mail.entity'

export interface EmailAdapter {
  sendMail: ({ infoMail }: { infoMail: InfoMail }) => Promise<{
    message: string
  }>
}
