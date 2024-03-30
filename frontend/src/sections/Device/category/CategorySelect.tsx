import { type FC, Suspense, lazy } from 'react'
import { useAppContext } from '../../Context/AppContext'
import { type Primitives } from '../../../modules/shared/domain/value-object/Primitives'
import { type CategoryId } from '../../../modules/devices/category/domain/CategoryId'
import { type OnChange } from '../../../modules/shared/domain/types/types'
import { Operator } from '../../../modules/shared/domain/criteria/FilterOperators'

const Select = lazy(async () => await import('../../ui/select'))

interface Props {
  value: Primitives<CategoryId>
  onChange: OnChange
  isRequired?: boolean
}

const CategorySelect: FC<Props> = ({ value, onChange, isRequired = false }) => {
  const { category: { categories } } = useAppContext()

  return (
        <Suspense>
            <Select
                 label='Categoria'
                 name='categoryId'
                 onChange={(event) => { onChange(event, Operator.EQUAL) }}
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
