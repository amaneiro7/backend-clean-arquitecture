export interface CreateRepository<T, Payload> {
  create: (payload: Payload) => Promise <T>
}
