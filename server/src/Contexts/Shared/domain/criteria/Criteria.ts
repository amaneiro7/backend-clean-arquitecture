import { type Order } from './Order'

export interface QueryOptions {
  where: Record<string, any>
  limit?: number
  offset?: number
  order?: Array<[string, string]>
}

export interface Filter {
  field: string
  operator: string
  value: any
}
export class Criteria {
  constructor (
    private readonly filters: Filter[],
    private readonly order: Order,
    private readonly limit?: number,
    private readonly offset?: number
  ) {}

  public hasFilters (): boolean {
    return this.filters.length > 0
  }
}
