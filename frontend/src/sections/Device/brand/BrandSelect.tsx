import { type ChangeEvent, type FC, Suspense, lazy, useMemo } from 'react'
import { useAppContext } from '../../Context/AppContext'
import { Link } from 'react-router-dom'
import { AddIcon } from '../../ui/icon/AddIcon'
import { EditIcon } from '../../ui/icon/EditIcon'
import { useBrand } from './useBrand'
import { type BrandApiResponse } from '../../../modules/shared/domain/types/responseTypes'

const Select = lazy(async () => await import('../../ui/select'))

interface Props {
  value: string
  categoryId: number
  onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  isForm?: boolean
}

const BrandSelect: FC<Props> = ({ value, onChange, categoryId, isForm = true }) => {
  const { repository } = useAppContext()
  const { brands } = useBrand(repository)

  const filterdBrand = useMemo(() => {
    if (categoryId === undefined || categoryId === 0) {
      return brands
    }

    return brands.filter(brand =>
      (brand as BrandApiResponse).model?.some(model =>
        model.categoryId === categoryId)
    )
  }, [brands, categoryId])

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
                 options={filterdBrand as BrandApiResponse[]}
                 placeholder='-- Filtre por Marca --'
                 isHidden={true}
                 isDisabled={false}
                 value={value}

            />
            {isForm && <Link
              className='absolute -right-11'
              to={`/brand/edit/${value}`}
              state={{
                brand: brands.find(brand => brand.id === value)
              }}
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
