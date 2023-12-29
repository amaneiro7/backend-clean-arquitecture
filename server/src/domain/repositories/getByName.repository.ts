export interface GetByNameRepository<T> {
  exec: ({ name }: { name: string }) => Promise <T | undefined>
}
