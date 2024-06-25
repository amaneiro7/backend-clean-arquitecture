import { CategoryId } from "../../../../modules/devices/category/domain/CategoryId"
import { Operator } from "../../../../modules/shared/domain/criteria/FilterOperators"
import { type SearchByCriteriaQuery } from "../../../../modules/shared/infraestructure/criteria/SearchByCriteriaQuery"

export const defaultCategoryList = [
    CategoryId.categoryOptions.LASERPRINTER,
    CategoryId.categoryOptions.INKPRINTER,
    CategoryId.categoryOptions.MFP,
]

export const defaultCategoryQuery: SearchByCriteriaQuery = {
    filters: [
        ...defaultCategoryList.map(id => ({ field: 'categoryId', operator: Operator.EQUAL, value: id })),
    ]
}