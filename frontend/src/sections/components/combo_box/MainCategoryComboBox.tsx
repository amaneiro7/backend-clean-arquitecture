import { lazy, useMemo } from "react"
import { useAppContext } from "../../Context/AppProvider"
import { Operator } from "../../../modules/shared/domain/criteria/FilterOperators"

import { type OnHandleChange } from "../../../modules/shared/domain/types/types"
import { type Primitives } from "../../../modules/shared/domain/value-object/Primitives"
import { type MainCategoryId } from "@/modules/devices/mainCategory/domain/MainCategoryId"
import { type MainCategoryPrimitives } from "@/modules/devices/mainCategory/domain/MainCategory"


interface Props {
    value: Primitives<MainCategoryId>
    filter?: Primitives<MainCategoryId>[]
    onChange: OnHandleChange
    type?: 'form' | 'search'
    isAdd?: boolean
    error?: string
    isRequired?: boolean
    isDisabled?: boolean
}

const ComboBox = lazy(async () => import("./combo_box"))
const ReadOnlyInputBox = lazy(async () => import("../ReadOnlyInputBox").then(m => ({ default: m.ReadOnlyInputBox })))

export default function MainCategoryComboBox({ value, filter, error, isDisabled = false, isRequired, onChange, type = 'search', isAdd = false }: Props) {
    const { useMainCategory: { mainCategories , loading } } = useAppContext()

    const filterCategory = useMemo(() => {
      if (!filter) return mainCategories
      return mainCategories.filter(cat =>  filter.includes(cat.id))
      
    },[mainCategories, filter])

    const initialValue = useMemo(() => {
        return mainCategories.find(category => category.id === value)
    }, [mainCategories, value])


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
              onChange={(_, newValue: MainCategoryPrimitives) => {
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