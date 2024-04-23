import { type FC, Suspense, lazy } from 'react'
import { useAppContext } from '../../Context/AppContext'
import { type Primitives } from '../../../modules/shared/domain/value-object/Primitives'
import { type CategoryId } from '../../../modules/devices/category/domain/CategoryId'
import { type OnHandleChange } from '../../../modules/shared/domain/types/types'
import { Operator } from '../../../modules/shared/domain/criteria/FilterOperators'
import { useCategory } from './useCategory'

const Select = lazy(async () => await import('../../ui/Select'))

interface Props {
  value: Primitives<CategoryId>
  onChange: OnHandleChange
  isRequired?: boolean
}

const CategorySelect: FC<Props> = ({ value, onChange, isRequired = false }) => {
  const { repository } = useAppContext()
  const { categories } = useCategory(repository)

  return (
        <Suspense>
            <Select
                 label='Categoria'
                 name='categoryId'
                 onChange={(event) => {
                   const { name, value } = event.target
                   onChange(name, value, Operator.EQUAL)
                 }}
                 options={categories}
                 placeholder='-- Filtre por Categoria --'
                 isHidden={true}
                 isDisabled={false}
                 isRequired={isRequired}
                 value={value}
            />
        </Suspense>
  )
}

export default CategorySelect
