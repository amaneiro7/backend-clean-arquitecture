import { hashSync } from 'bcrypt'

interface Props {
  password: string
}
export async function hashPassword ({ password }: Props): Promise<string> {
  const saltOptions = 10
  return hashSync(password, saltOptions)
}
