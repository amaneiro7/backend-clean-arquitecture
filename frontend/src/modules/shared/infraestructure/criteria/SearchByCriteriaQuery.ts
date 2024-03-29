import { type FiltersPrimitives } from '../../domain/criteria/Filter'
import { type Limit } from '../../domain/criteria/Limit'
import { type Offset } from '../../domain/criteria/Offset'
import { type OrderBy } from '../../domain/criteria/OrderBy'
import { type OrderType } from '../../domain/criteria/OrderType'
import { type Primitives } from '../../domain/value-object/Primitives'
import { type Query } from './Query'

export class SearchByCriteriaQuery implements Query {
  constructor (
    public readonly filters?: FiltersPrimitives[],
    public readonly orderBy?: Primitives<OrderBy>,
    public readonly orderType?: Primitives<OrderType>,
    public readonly limit?: Primitives<Limit>,
    public readonly offset?: Primitives<Offset>
  ) {}
}
