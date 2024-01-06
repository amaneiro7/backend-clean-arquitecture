import { compareSync } from 'bcrypt'

interface Props {
  inputPassword: string
  userPassword: string
}
export async function comparePassword ({ inputPassword, userPassword }: Props): Promise<boolean> {
  return compareSync(inputPassword, userPassword)
}
