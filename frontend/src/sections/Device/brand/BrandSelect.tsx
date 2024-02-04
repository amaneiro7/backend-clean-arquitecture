import { type ChangeEvent, type FC, Suspense, lazy } from 'react'
import { useAppContext } from '../../Context/AppContext'

const Select = lazy(async () => await import('../../ui/select'))

interface Props {
  value: string
  onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
}

const BrandSelect: FC<Props> = ({ value, onChange }) => {
  const { brands } = useAppContext()
  return (
        <Suspense>
            <Select
                 label='Marca'
                 name='brandId'
                 onChange={onChange}
                 options={brands}
                 placeholder='-- Filtre por Marca --'
                 isHidden={false}
                 isDisabled={false}
                 value={value}
            />
        </Suspense>
  )
}

export default BrandSelect
