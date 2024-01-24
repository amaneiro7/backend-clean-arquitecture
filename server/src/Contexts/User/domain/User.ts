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
    private readonly id: UserId,
    private email: UserEmail,
    private name: UserName,
    private role: Roles,
    private lastName: UserLastName,
    private password: UserPassword
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

  toPrimitives (): UserPrimitives {
    return {
      id: this.id.value,
      name: this.name.value,
      lastName: this.lastName.value,
      email: this.email.value,
      role: this.role.value,
      password: this.password.value
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

  updateRole (newRole: RoleTypes): void {
    this.role = new Roles(newRole)
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

  get roleValue (): RoleTypes {
    return this.role.value
  }

  get passwordValue (): string {
    return this.password.value
  }
}
