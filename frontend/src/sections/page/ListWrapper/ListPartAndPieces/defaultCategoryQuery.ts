import { CategoryId } from "../../../../modules/devices/category/domain/CategoryId"
import { Operator } from "../../../../modules/shared/domain/criteria/FilterOperators"
import { type SearchByCriteriaQuery } from "../../../../modules/shared/infraestructure/criteria/SearchByCriteriaQuery"

export const defaultCategoryList = [
    CategoryId.categoryOptions.BAM,
    CategoryId.categoryOptions.HARDDRIVE,
    CategoryId.categoryOptions.KEYBOARD,
    CategoryId.categoryOptions.MOUSE,
    CategoryId.categoryOptions.SCANNER,
    CategoryId.categoryOptions.PHONE,
]

export const defaultCategoryQuery: SearchByCriteriaQuery = {
    filters: [
        ...defaultCategoryList.map(id => ({ field: 'categoryId', operator: Operator.EQUAL, value: id })),
    ]
}