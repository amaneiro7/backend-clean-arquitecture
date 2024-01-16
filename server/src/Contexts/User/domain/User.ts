import { type RoleTypes, Roles } from './Role'
import { UserEmail } from './UserEmail'
import { UserId } from './UserId'
import { UserLastName } from './UserLastName'
import { UserName } from './UserName'
import { UserPassword } from './UserPassword'

export interface UserPrimitives {
  id: string
  email: string
  name: string
  role: RoleTypes
  lastName: string
  password: string
}

export class User {
  constructor (
    private readonly _id: UserId,
    private _email: UserEmail,
    private _name: UserName,
    private _role: Roles,
    private _lastName: UserLastName,
    private _password: UserPassword
  ) {}

  static create ({ email, name, lastName, role, password }: { email: string, name: string, lastName: string, role: RoleTypes, password: string }): User {
    const id = UserId.random().toString()
    return new User(
      new UserId(id),
      new UserEmail(email),
      new UserName(name),
      new Roles(role),
      new UserLastName(lastName),
      new UserPassword(password)
    )
  }

  static fromPrimitives (primitives: UserPrimitives): User {
    return new User(
      new UserId(primitives.id),
      new UserEmail(primitives.email),
      new UserName(primitives.name),
      new Roles(primitives.role),
      new UserLastName(primitives.lastName),
      new UserPassword(primitives.password)
    )
  }

  updateEmail (newEmail: string): void {
    this._email = new UserEmail(newEmail)
  }

  updateName (newName: string): void {
    this._name = new UserName(newName)
  }

  updateLastName (newLastName: string): void {
    this._lastName = new UserLastName(newLastName)
  }

  updateRole (newRole: RoleTypes): void {
    this._role = new Roles(newRole)
  }

  updatePassword (newPassword: string): void {
    this._password = new UserPassword(newPassword)
  }

  get userId (): string {
    return this._id.value
  }

  get email (): string {
    return this._email.value
  }

  get name (): string {
    return this._name.value
  }

  get lastName (): string {
    return this._lastName.value
  }

  get role (): RoleTypes {
    return this._role.value
  }
}
