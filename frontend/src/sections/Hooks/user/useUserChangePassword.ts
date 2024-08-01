import { ChangePassword, type ChangePasswordParams } from '../../../modules/user/user/application/changePassoword'
import { ApiUserRepository } from '../../../modules/user/user/infrastructure/UserApiRepository'

export interface UseUser {
  changePassword: (formData: ChangePasswordParams) => Promise<void>
}

export const useUserChangePassword = (): UseUser => {
  const repository = new ApiUserRepository()

  async function changePassword(formData: ChangePasswordParams) {
    return await new ChangePassword(repository).run(formData)
  }

  return {
    changePassword,
  }
}
