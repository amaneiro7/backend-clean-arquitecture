export interface GetAllRepository<T> {
  exec: () => Promise <T[]>
}
