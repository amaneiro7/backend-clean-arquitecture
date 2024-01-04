export class LocalLogin {
  async exec (payload: Payload): Promise<T> {
    return await this.store.exec(payload)
  }
}
