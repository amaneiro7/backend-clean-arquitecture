export interface GetByNameRepository<T> {
  getByName: ({ name }: { name: string }) => Promise <T | undefined>
}
