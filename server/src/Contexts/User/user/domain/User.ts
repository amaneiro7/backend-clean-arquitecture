import { RoleId } from '../../Role/domain/RoleId'
import { UserEmail } from './UserEmail'
import { UserId } from './UserId'
import { UserLastName } from './UserLastName'
import { UserName } from './UserName'
import { UserPassword } from './UserPassword'

export interface UserPrimitives {
  id: string
  email: string
  name: string
  roleId: number
  lastName: string
  password: string
}

export class User {
  constructor (
    private readonly id: UserId,
    private email: UserEmail,
    private name: UserName,
    private roleId: RoleId,
    private lastName: UserLastName,
    private password: UserPassword
  ) {}

  static create ({ email, name, lastName, roleId, password }: Omit<UserPrimitives, 'id'>): User {
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

  static fromPrimitives (primitives: UserPrimitives): User {
    return new User(
      new UserId(primitives.id),
      new UserEmail(primitives.email),
      new UserName(primitives.name),
      new RoleId(primitives.roleId),
      new UserLastName(primitives.lastName),
      new UserPassword(primitives.password)
    )
  }

  toPrimitives (): UserPrimitives {
    return {
      id: this.idValue,
      name: this.nameValue,
      lastName: this.lastNameValue,
      email: this.emailValue,
      roleId: this.roleValue,
      password: this.passwordValue
    }
  }

  updateEmail (newEmail: string): void {
    this.email = new UserEmail(newEmail)
  }

  updateName (newName: string): void {
    this.name = new UserName(newName)
  }

  updateLastName (newLastName: string): void {
    this.lastName = new UserLastName(newLastName)
  }

  updateRole (newRole: number): void {
    this.roleId = new RoleId(newRole)
  }

  updatePassword (newPassword: string): void {
    this.password = new UserPassword(newPassword)
  }

  get idValue (): string {
    return this.id.value
  }

  get emailValue (): string {
    return this.email.value
  }

  get nameValue (): string {
    return this.name.value
  }

  get lastNameValue (): string {
    return this.lastName.value
  }

  get roleValue (): number {
    return this.roleId.value
  }

  get passwordValue (): string {
    return this.password.value
  }
}
