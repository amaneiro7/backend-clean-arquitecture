import { ApiAuthRepository } from '../../../modules/user/auth/infraestructure/ApiAuthRepository'
import { ChangePassword } from '../../../modules/user/auth/application/changePassoword'


export interface UseUser {
  changePassword: (formData: ChangePasswordFormData) => Promise<void>
}
export interface ChangePasswordFormData { password: string, newPassword: string, reTypePassword: string }
export const useUser = (): UseUser => {
  const repository = new ApiAuthRepository()

  async function changePassword(formData: ChangePasswordFormData) {

    return await new ChangePassword(repository).run(formData)
  }

  return {
    changePassword,
  }
}
