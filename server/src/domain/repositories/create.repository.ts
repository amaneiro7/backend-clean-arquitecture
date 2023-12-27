export interface CreateRepository<T, Payload> {
  exec: (payload: Payload) => Promise <T>
}
