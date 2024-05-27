import { CategoryValues } from '../../../Category/domain/Category'
import { Criteria } from '../../../Shared/domain/criteria/Criteria'
import { Filter } from '../../../Shared/domain/criteria/Filter'
import { FilterField } from '../../../Shared/domain/criteria/FilterField'
import { FilterOperator, Operator } from '../../../Shared/domain/criteria/FilterOperator'
import { Filters } from '../../../Shared/domain/criteria/Filters'
import { FilterValue } from '../../../Shared/domain/criteria/FilterValue'
import { Order } from '../../../Shared/domain/criteria/Order'
import { type Repository } from '../../../Shared/domain/Repository'
import { SearchByCriteriaQuery } from '../../../Shared/domain/SearchByCriteriaQuery'
import { type DevicePrimitives } from '../domain/Device'

export class DeviceComputerFinder {
    constructor(private readonly repository: Repository) { }

    async search(query: SearchByCriteriaQuery): Promise<DevicePrimitives[]> {
        query.filters.push(
            { field: 'categoryId', operator: Operator.EQUAL, value: CategoryValues.COMPUTADORAS },
            { field: 'categoryId', operator: Operator.EQUAL, value: CategoryValues.LAPTOPS },
            { field: 'categoryId', operator: Operator.EQUAL, value: CategoryValues.SERVIDORES },
            { field: 'categoryId', operator: Operator.EQUAL, value: CategoryValues.ALLINONE }
        )

        const filters = query.filters.map(({ field, operator, value }) => {
            return new Filter(
                new FilterField(field),
                FilterOperator.fromValue(operator),
                new FilterValue(value)
            )
        })
        const order = Order.fromValues(
            query.orderBy ?? 'categoryId',
            query.orderType
        )

        const criteria = new Criteria(new Filters(filters), order, query.limit, query.offset)
        return await this.repository.device.matching(criteria)
    }
}
