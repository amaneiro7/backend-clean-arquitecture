import { UserPassword } from '../../user/domain/UserPassword'
import { type AuthRepository } from '../domain/AuthRepository'

export class ChangePassword {
    constructor(private readonly repository: AuthRepository) { }

    async run({ password, newPassword, reTypePassword }: { password: string, newPassword: string, reTypePassword: string }): Promise<void> {
        if (newPassword !== reTypePassword) {
            throw new Error('Las contraseñas no coinciden')
        }

        if (password === newPassword) {
            throw new Error('La nueva contraseña debe ser diferente a la actual')
        }
        const updatePassword = new UserPassword(newPassword).value
        return await this.repository.changePassword({ password, newPassword: updatePassword, reTypePassword })
    }
}
