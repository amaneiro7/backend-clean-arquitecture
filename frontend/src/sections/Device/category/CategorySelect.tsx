import { type ChangeEvent, type FC, Suspense, lazy } from 'react'
import { useAppContext } from '../../Context/AppContext'
import { useCategory } from './useCategory'

const Select = lazy(async () => await import('../../ui/select'))

interface Props {
  value: number | string
  onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
}

const CategorySelect: FC<Props> = ({ value, onChange }) => {
  const { repository } = useAppContext()
  const { categories } = useCategory(repository)
  return (
        <Suspense>
            <Select
                 label='Categoria'
                 name='categoryId'
                 onChange={onChange}
                 options={categories}
                 placeholder='-- Filtre por Categoria --'
                 isHidden={false}
                 isDisabled={false}
                 value={value}
            />
        </Suspense>
  )
}

export default CategorySelect
