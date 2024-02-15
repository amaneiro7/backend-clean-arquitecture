import { RoleId } from '../../role/domain/RoleId'
import { UserEmail } from './UserEmail'
import { UserName } from './UserName'
import { UserPassword } from './UserPassword'
import { UserLastName } from './UserlastName'

export interface UserPrimitives {
  id?: string
  name: string
  lastName: string
  email: string
  roleId: number
  password: string
}
export class User {
  constructor (
    private readonly name: UserName,
    private readonly lastName: UserLastName,
    private readonly email: UserEmail,
    private readonly roleId: RoleId,
    private readonly password: UserPassword
  ) {}

  public static create ({ name, lastName, email, roleId, password }: UserPrimitives): User {
    return new User(
      new UserName(name),
      new UserLastName(lastName),
      new UserEmail(email),
      new RoleId(roleId),
      new UserPassword(password)
    )
  }

  nameValue (): string {
    return this.name.value
  }

  lastNameValue (): string {
    return this.lastName.value
  }

  emailValue (): string {
    return this.email.value
  }

  roleIdValue (): number {
    return this.roleId.value
  }

  passwordValue (): string {
    return this.password.value
  }

  toPrimitives (): UserPrimitives {
    return {
      name: this.nameValue(),
      lastName: this.lastNameValue(),
      email: this.emailValue(),
      roleId: this.roleIdValue(),
      password: this.passwordValue()
    }
  }
}
