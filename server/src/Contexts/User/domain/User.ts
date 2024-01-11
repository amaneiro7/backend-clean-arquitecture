import { UserEmail } from './UserEmail'
import { UserId } from './UserId'

export interface UserPrimitives {
  id: string
  email: string
}

export class User {
  constructor (
    private readonly id: UserId,
    private email: UserEmail
  ) {}

  static create ({ id, email }: { id: string, email: string }): User {
    return new User(
      new UserId(id),
      new UserEmail(email)
    )
  }

  static fromPrimitives (primitives: UserPrimitives): User {
    return new User(
      new UserId(primitives.id),
      new UserEmail(primitives.email)
    )
  }

  updateEmail (newEmail: string): void {
    this.email = new UserEmail(newEmail)
  }

  get IdValue (): string {
    return this.id.value
  }

  get emailValue (): string {
    return this.email.value
  }
}
