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
    private readonly filters: Filter[] = [],
    private limit?: number | undefined,
    private offset?: number | undefined,
    private orderBy?: string | undefined,
    private orderType?: string | undefined

  ) {}

  addFilter (field: string, operator: string, value: any): void {
    this.filters.push({ field, operator, value })
  }

  setLimit (limit: number): void {
    this.limit = limit
  }

  setOffset (offset: number): void {
    this.offset = offset
  }

  setOrderBy (orderBy: string): void {
    this.orderBy = orderBy
  }

  setOrderType (orderType: string): void {
    this.orderType = orderType
  }

  toQueryOptions (): QueryOptions {
    const queryOptions: QueryOptions = {
      where: {}
    }
    for (const filter of this.filters) {
      queryOptions.where[filter.field] = {
        [filter.operator]: filter.value
      }
    }

    if (this.limit !== undefined && this.offset !== undefined) {
      queryOptions.limit = this.limit
      queryOptions.offset = this.offset
    }

    if (this.orderBy !== undefined && this.orderType !== undefined) {
      queryOptions.order = [[this.orderBy, this.orderType]]
    }
    return queryOptions
  }

  // static fromPrimitives (
  //   filters: FiltersPrimitives[],
  //   orderBy: string | null,
  //   orderType: string | null,
  //   limit?: number,
  //   offset?: number
  // ): Criteria {
  //   return new Criteria(
  //     Filter.fromPrimitives(filters),
  //     Order.fromPrimitives(orderBy, orderType),
  //     limit,
  //     offset
  //   )
  // }

  public hasFilters (): boolean {
    return this.filters.length > 0
  }
}
