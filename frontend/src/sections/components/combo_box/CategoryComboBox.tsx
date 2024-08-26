import { lazy, useMemo } from "react"
import { useAppContext } from "../../Context/AppProvider"
import { Operator } from "../../../modules/shared/domain/criteria/FilterOperators"

import { type OnHandleChange } from "../../../modules/shared/domain/types/types"
import { type Primitives } from "../../../modules/shared/domain/value-object/Primitives"
import { type CategoryPrimitives } from "../../../modules/devices/category/domain/Category"
import { type CategoryId } from "../../../modules/devices/category/domain/CategoryId"

interface Props {
    value: Primitives<CategoryId>
    filter?: Primitives<CategoryId>[]
    onChange: OnHandleChange
    type?: 'form' | 'search'
    isAdd?: boolean
    error?: string
    isRequired?: boolean
    isDisabled?: boolean
}

const ComboBox = lazy(async () => import("./combo_box"))
const ReadOnlyInputBox = lazy(async () => import("../ReadOnlyInputBox").then(m => ({ default: m.ReadOnlyInputBox })))

export default function CategoryComboBox({ value, filter, error, isDisabled = false, isRequired, onChange, type = 'search', isAdd = false }: Props) {
    const { useCategory: { categories, loading } } = useAppContext()

    const filterCategory = useMemo(() => {
      if (!filter) return categories
      return categories.filter(cat =>  filter.includes(cat.id))
      
    },[categories, filter])

    const initialValue = useMemo(() => {
        return categories.find(category => category.id === value)
    }, [categories, value])


    return (
      <>
        {(!isAdd && type === 'form') 
          ? <ReadOnlyInputBox label='Categoria' required={isRequired} defaultValue={initialValue?.name} /> 
          : <ComboBox
              id='categoryId'
              initialValue={initialValue}
              label='Categoria'
              name='categoryId'
              type={type}
              onChange={(_, newValue: CategoryPrimitives) => {
                        onChange('categoryId', newValue ? newValue.id : '', Operator.EQUAL)
                    }}
              options={filterCategory}
              isRequired={isRequired}
              isDisabled={isDisabled}
              loading={loading}
              isError={!!error}
              errorMessage={error}
            />}
      </>
    )
}