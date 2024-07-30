import { Primitives } from '../../../Shared/domain/value-object/Primitives'
import { RoleId } from '../../Role/domain/RoleId'
import { UserEmail } from './UserEmail'
import { UserId } from './UserId'
import { UserLastName } from './UserLastName'
import { UserName } from './UserName'
import { UserPassword } from './UserPassword'

export interface UserPrimitives {
  id: Primitives<UserId>
  email: Primitives<UserEmail>
  name: Primitives<UserName>
  roleId: Primitives<RoleId>
  lastName: Primitives<UserLastName>
  password: Primitives<UserPassword>
}

export class User {
  constructor(
    private readonly id: UserId,
    private email: UserEmail,
    private name: UserName,
    private roleId: RoleId,
    private lastName: UserLastName,
    private password: UserPassword
  ) { }

  static create({ email, name, lastName, roleId, password }: Omit<UserPrimitives, 'id'>): User {
    const id = UserId.random().toString()
    return new User(
      new UserId(id),
      new UserEmail(email),
      new UserName(name),
      new RoleId(roleId),
      new UserLastName(lastName),
      new UserPassword(password)
    )
  }


  static isSuperAdmin({ roleId }: { roleId: Primitives<RoleId> }): boolean {
    const acceptedAdminRoles = [RoleId.Options.ADMIN, RoleId.Options.COORD]
    return acceptedAdminRoles.includes(roleId)
  }

  static fromPrimitives(primitives: UserPrimitives): User {
    return new User(
      new UserId(primitives.id),
      new UserEmail(primitives.email),
      new UserName(primitives.name),
      new RoleId(primitives.roleId),
      new UserLastName(primitives.lastName),
      new UserPassword(primitives.password)
    )
  }

  toPrimitives(): UserPrimitives {
    return {
      id: this.idValue,
      name: this.nameValue,
      lastName: this.lastNameValue,
      email: this.emailValue,
      roleId: this.roleValue,
      password: this.passwordValue
    }
  }

  updateEmail(newEmail: Primitives<UserEmail>): void {
    this.email = new UserEmail(newEmail)
  }

  updateName(newName: Primitives<UserName>): void {
    this.name = new UserName(newName)
  }

  updateLastName(newLastName: Primitives<UserLastName>): void {
    this.lastName = new UserLastName(newLastName)
  }

  updateRole(newRole: Primitives<RoleId>): void {
    this.roleId = new RoleId(newRole)
  }

  updatePassword(newPassword: Primitives<UserPassword>): void {
    this.password = new UserPassword(newPassword)
  }

  get idValue(): Primitives<UserId> {
    return this.id.value
  }

  get emailValue(): Primitives<UserEmail> {
    return this.email.value
  }

  get nameValue(): Primitives<UserName> {
    return this.name.value
  }

  get lastNameValue(): Primitives<UserLastName> {
    return this.lastName.value
  }

  get roleValue(): Primitives<RoleId> {
    return this.roleId.value
  }

  get passwordValue(): Primitives<UserPassword> {
    return this.password.value
  }
}
