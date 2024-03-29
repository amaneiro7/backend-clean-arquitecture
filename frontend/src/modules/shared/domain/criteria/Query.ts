import { type Primitives } from '../value-object/Primitives'
import { type Limit } from './Limit'
import { type Offset } from './Offset'
import { type OrderBy } from './OrderBy'
import { type OrderType } from './OrderType'

export class Query {
  constructor (
    public readonly filters?: Array<{ field: string, operator: string, value: string }>,
    public readonly orderBy?: Primitives<OrderBy>,
    public readonly orderType?: Primitives<OrderType>,
    public readonly limit?: Primitives<Limit>,
    public readonly offset?: Primitives<Offset>
  ) {}
}
