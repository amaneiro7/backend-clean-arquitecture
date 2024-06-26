import { RoleId } from '../../role/domain/RoleId'
import { UserEmail } from './UserEmail'
import { UserName } from './UserName'
import { UserPassword } from './UserPassword'
import { UserLastName } from './UserLastName'
import { type Primitives } from '../../../shared/domain/value-object/Primitives'
import { type UserId } from './UserId'

export interface UserPrimitives {
  id?: Primitives<UserId>
  name: Primitives<UserName>
  lastName: Primitives<UserLastName>
  email: Primitives<UserEmail>
  roleId: Primitives<RoleId>
  password: Primitives<UserPassword>
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

  nameValue (): Primitives<UserName> {
    return this.name.value
  }

  lastNameValue (): Primitives<UserLastName> {
    return this.lastName.value
  }

  emailValue (): Primitives<UserEmail> {
    return this.email.value
  }

  roleIdValue (): Primitives<RoleId> {
    return this.roleId.value
  }

  passwordValue (): Primitives<UserPassword> {
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
