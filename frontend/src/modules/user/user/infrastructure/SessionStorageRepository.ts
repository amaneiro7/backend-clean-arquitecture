import { type UserPrimitives } from '../domain/User'
import { type UserStorageRepository } from '../domain/UserStorageRepository'

export class SessionStorageRepository implements UserStorageRepository {
  private readonly storeName: string = 'sessionData'
  async getSession(): Promise<UserPrimitives> {
    const storedSessionData = sessionStorage.getItem(this.storeName)
    if (storedSessionData != null) {
      return JSON.parse(storedSessionData)
    }
    return JSON.parse(localStorage.getItem(this.storeName) ?? '{}')
  }

  async saveSession({ user }: { user: UserPrimitives }): Promise<void> {
    localStorage.setItem(this.storeName, JSON.stringify(user))
    sessionStorage.setItem(this.storeName, JSON.stringify(user))
  }

  async logOutSession(): Promise<void> {
    localStorage.removeItem(this.storeName)
    sessionStorage.removeItem(this.storeName)
  }
}
