import { unauthorized } from '@hapi/boom'
import { type Repository } from '../../domain/repositories/respoitory'
import { getUserByEmail } from '../get/getUserByEmail'
import { ExpireTime, generateAccessToken } from '../utils/generateAccessToken'
import { config } from '../../../config/env.file'
import { type EmailAdapter } from '../../domain/adapters/email.adapter'
import { type InfoMail } from '../../domain/entities/mail.entity'

interface Props {
  email: string
  repository: Repository
  emailAdapter: EmailAdapter
}

export async function sendRecovery ({ email, repository, emailAdapter }: Props): Promise<{ message: string }> {
  const user = await getUserByEmail({ email, repository })
  if (user === undefined) {
    throw unauthorized()
  }

  const payload = { sub: user.id }
  const token = generateAccessToken({
    payload,
    accessTokenDuration: ExpireTime.accessTokenDurantion,
    secret: config.accessTokenSecret
  })
  const link = `http://myfrontend.com/recovery?token=${token}`
  const infoMail: InfoMail = {
    from: config.smtpEmail,
    to: user.email,
    subject: 'Email para recuperar contraseña',
    text: `<b>Ingresa a este link => ${link}</b>`
  }
  return await emailAdapter.sendMail({ infoMail })
}
