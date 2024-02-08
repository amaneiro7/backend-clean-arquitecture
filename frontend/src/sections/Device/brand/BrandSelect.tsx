import { type ChangeEvent, type FC, Suspense, lazy } from 'react'
import { useAppContext } from '../../Context/AppContext'
import { Link } from 'react-router-dom'
import { AddIcon } from '../../ui/icon/AddIcon'
import { EditIcon } from '../../ui/icon/EditIcon'
import { useBrand } from './useBrand'

const Select = lazy(async () => await import('../../ui/select'))

interface Props {
  value: string
  onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  isForm?: boolean
}

const BrandSelect: FC<Props> = ({ value, onChange, isForm = true }) => {
  const { repository } = useAppContext()
  const { brands } = useBrand(repository)
  return (
        <Suspense>
          <div className='w-full flex relative'>
            {isForm && <Link
              className='absolute -left-11'
              to={'/brand/add'}
            >
              <AddIcon />
            </Link>}
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
            {isForm && <Link
              className='absolute -right-11'
              to={`/brand/edit/${value}`}
              state={{}}
            >
              <EditIcon
                isDisbaled={value === ''}
              />
            </Link>}
          </div>
        </Suspense>
  )
}

export default BrandSelect
