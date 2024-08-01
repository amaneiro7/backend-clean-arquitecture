import { InvalidArgumentError } from '../../../Shared/domain/value-object/InvalidArgumentError'
import { Primitives } from '../../../Shared/domain/value-object/Primitives'
import { StringValueObject } from '../../../Shared/domain/value-object/StringValueObject'
import { User, UserPrimitives } from './User'
import { UserAlreadyExistError } from './UserAlreadyExistError'
import { UserRepository } from './UserRepository'

export class UserEmail extends StringValueObject {
  private readonly validEmailRegExp =
    /^(?=.*[@](?:bnc\.com\.ve)$)[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?\.)+[a-zA-Z0-9_-]*$/

  constructor(readonly value: string) {
    super(value)

    this.ensureIsValidEmail(value)
  }

  toPrimitives(): string {
    return this.value
  }

  private ensureIsValidEmail(value: string): void {
    if (!this.isValid(value)) {
      throw new InvalidArgumentError(`<${value}> is not a valid email`)
    }
  }

  private isValid(name: string): boolean {
    return this.validEmailRegExp.test(name)
  }

  static async updateEmailField({ repository, email, entity }: { repository: UserRepository, email?: Primitives<UserEmail>, entity: User }): Promise<void> {
    // Si no se ha pasado un nuevo correo no realiza ninguna acción
    if (email === undefined) {
      return
    }
    // Verifica que si el correo actual y el nuevo correo son iguales no realice una busqueda en el repositorio
    if (entity.emailValue === email) {
      return
    }
    // Verifica que el Email no exista en la base de datos, si existe lanza un error {@link DeviceAlreadyExistError} con el Email pasado
    await UserEmail.ensureEmailDoesNotExit({ repository, email })
    // Actualiza el campo Email de la entidad {@link Device} con el nuevo Email
    entity.updateEmail(email)
  }

  static async ensureEmailDoesNotExit({ repository, email }: { repository: UserRepository, email: Primitives<UserEmail> }): Promise<void> {
    // Searches for a device with the given Email in the database
    const userWithEmail: UserPrimitives | null = await repository.searchByEmail(new UserEmail(email).value)
    // If a device with the given Email exists, it means that it already exists in the database,
    // so we need to throw a {@link DeviceAlreadyExistError} with the given Email
    if (userWithEmail !== null) {
      throw new UserAlreadyExistError(email)
    }
  }
}
