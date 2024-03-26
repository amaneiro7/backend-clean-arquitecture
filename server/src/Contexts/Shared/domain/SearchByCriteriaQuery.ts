import { type FiltersPrimitives } from './criteria/Filter'
import { type Query } from './Query'

export class SearchByCriteriaQuery implements Query {
  constructor (
    public readonly filters: FiltersPrimitives[],
    public readonly orderBy?: string,
    public readonly orderType?: string,
    public readonly limit?: number,
    public readonly offset?: number
  ) {}
}
