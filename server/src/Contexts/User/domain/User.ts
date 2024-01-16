import { UserEmail } from './UserEmail'
import { UserId } from './UserId'
import { UserLastName } from './UserLastName'
import { UserName } from './UserName'
import { UserPassword } from './UserPassword'

export interface UserPrimitives {
  userId: string
  email: string
  name: string
  lastName: string
  password: string
}

export class User {
  constructor (
    private readonly _userId: UserId,
    private _email: UserEmail,
    private _name: UserName,
    private _lastName: UserLastName,
    private _password: UserPassword
  ) {}

  static create ({ id, email, name, lastName, password }: { id: string, email: string, name: string, lastName: string, password: string }): User {
    return new User(
      new UserId(id),
      new UserEmail(email),
      new UserName(name),
      new UserLastName(lastName),
      new UserPassword(password)
    )
  }

  static fromPrimitives (primitives: UserPrimitives): User {
    return new User(
      new UserId(primitives.userId),
      new UserEmail(primitives.email),
      new UserName(primitives.name),
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

  updatePassword (newPassword: string): void {
    this._password = new UserPassword(newPassword)
  }

  get userId (): string {
    return this._userId.value
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
}
