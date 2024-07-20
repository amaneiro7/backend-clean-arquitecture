import { lazy, Suspense, useMemo } from "react"
import { OnHandleChange } from "../../../modules/shared/domain/types/types"
import { Primitives } from "../../../modules/shared/domain/value-object/Primitives"
import { Operator } from "../../../modules/shared/domain/criteria/FilterOperators"
import { CategoryId } from "../../../modules/devices/category/domain/CategoryId"
import { InputSkeletonLoading } from "../skeleton/inputSkeletonLoading"
import { CategoryPrimitives } from "../../../modules/devices/category/domain/Category"
import { useAppContext } from "../../Context/AppProvider"


interface Props {
    value: Primitives<CategoryId>
    filter?: Primitives<CategoryId>[]
    onChange: OnHandleChange
    type?: 'form' | 'search'
    isAdd?: boolean
}

const ComboBox = lazy(async () => import("./combo_box"))
const ReadOnlyInputBox = lazy(async () => import("../ReadOnlyInputBox").then(m => ({ default: m.ReadOnlyInputBox })))

export default function CategoryComboBox({ value, filter, onChange, type = 'search', isAdd = false }: Props) {
    const { useCategory: { categories, loading } } = useAppContext()

    const filterCategory = useMemo(() => {
      if (!filter) return categories
      return categories.filter(cat =>  filter.includes(cat.id))
      
    },[categories, filter])

    const initialValue = useMemo(() => {
        return categories.find(category => category.id === value)
    }, [categories, value])


    return (
      <Suspense fallback={<InputSkeletonLoading />}>
        {(!isAdd && type === 'form') ? <ReadOnlyInputBox label='Categoria' required defaultValue={initialValue?.name} /> :
        <ComboBox
          id='categoryId'
          initialValue={initialValue}
          label='Categoria'
          name='categoryId'
          type={type}
          onChange={(_, newValue: CategoryPrimitives) => {
                        onChange('categoryId', newValue ? newValue.id : '', Operator.EQUAL)
                    }}
          options={filterCategory}
          isRequired={type === 'form'}
          isDisabled={false}
          loading={loading}
        />}
      </Suspense>
    )
}