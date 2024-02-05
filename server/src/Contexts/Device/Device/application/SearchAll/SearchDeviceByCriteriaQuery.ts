import { type Filter } from '../../../../Shared/domain/criteria/Filter'

export class SearchDeviceByCriteriaQuery {
  constructor (
    readonly filters: Filter[] | Array<Map<string, string>>,
    readonly orderBy?: string,
    readonly order?: string,
    readonly limit?: number,
    readonly offset?: number
  ) {}
}
