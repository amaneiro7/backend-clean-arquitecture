import { type StatusPrimitives } from './Status'

export abstract class BrandRepository {
  abstract searchAll (): Promise<StatusPrimitives[]>
}
