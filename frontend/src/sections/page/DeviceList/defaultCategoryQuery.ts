import { CategoryId } from "../../../modules/devices/category/domain/CategoryId"
import { Operator } from "../../../modules/shared/domain/criteria/FilterOperators"
import { type SearchByCriteriaQuery } from "../../../modules/shared/infraestructure/criteria/SearchByCriteriaQuery"

export const defaultCategoryList = [
    CategoryId.categoryOptions.COMPUTER,
    CategoryId.categoryOptions.LAPTOP,
    CategoryId.categoryOptions.ALLINONE,
    CategoryId.categoryOptions.SERVER
]

export const defaultCategoryQuery: SearchByCriteriaQuery = {
    filters: [
        ...defaultCategoryList.map(id => ({ field: 'categoryId', operator: Operator.EQUAL, value: id })),
    ]
}