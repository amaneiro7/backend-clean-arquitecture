import { notFound } from '@hapi/boom'
import { type Repository } from '../../domain/repositories/respoitory'
import { getUserByEmail } from '../get/getUserByEmail'
import { comparePassword } from '../utils/comparePassword'
import { signToken } from './signToken'
import { type SignTokenResult } from '../../types/types'

interface Props {
  email: string
  inputPassword: string
  repository: Repository
}
export async function localLogin ({ email, inputPassword, repository }: Props): Promise<SignTokenResult> {
  const user = await getUserByEmail({ email, repository })
  if (user === undefined) {
    throw notFound('Usuario no encontrado')
  }
  const isMatch = await comparePassword({ inputPassword, userPassword: user?.password })
  if (!isMatch) {
    throw new Error('Contraseña incorrecta')
  }
  const { password, recoveryToken, ...rta } = user
  return signToken({ user: rta })
}
