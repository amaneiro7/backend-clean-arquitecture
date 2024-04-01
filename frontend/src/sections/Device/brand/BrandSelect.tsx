import { Suspense, lazy, useMemo } from 'react'
import { useAppContext } from '../../Context/AppContext'
import { Link } from 'react-router-dom'
import { AddIcon } from '../../ui/icon/AddIcon'
import { EditIcon } from '../../ui/icon/EditIcon'
import { useBrand } from './useBrand'
import { type BrandApiResponse } from '../../../modules/shared/domain/types/responseTypes'
import { type Primitives } from '../../../modules/shared/domain/value-object/Primitives'
import { type BrandId } from '../../../modules/devices/brand/domain/BrandId'
import { type CategoryId } from '../../../modules/devices/category/domain/CategoryId'
import { type OnHandleChange } from '../../../modules/shared/domain/types/types'
import { Operator } from '../../../modules/shared/domain/criteria/FilterOperators'

const Select = lazy(async () => await import('../../ui/select'))

interface Props {
  value: Primitives<BrandId>
  categoryId: Primitives<CategoryId>
  onChange: OnHandleChange
  isForm?: boolean
  isRequired?: boolean
}

const BrandSelect: React.FC<Props> = ({ value, onChange, categoryId, isForm = true, isRequired = false }) => {
  const { repository } = useAppContext()
  const { brands } = useBrand(repository)

  const filterdBrand = useMemo(() => {
    if (categoryId === undefined || categoryId === '') {
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
                 onChange={(event) => {
                   const { name, value } = event.target
                   onChange(name, value, Operator.EQUAL)
                 }}
                 options={filterdBrand as BrandApiResponse[]}
                 placeholder='-- Filtre por Marca --'
                 isHidden={true}
                 isDisabled={false}
                 value={value}
                 isRequired={isRequired}

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
