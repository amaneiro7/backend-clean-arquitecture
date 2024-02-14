import { type ChangeEvent, type FC, Suspense, lazy, useMemo } from 'react'
import { useAppContext } from '../../Context/AppContext'
import { Link } from 'react-router-dom'
import { AddIcon } from '../../ui/icon/AddIcon'
import { EditIcon } from '../../ui/icon/EditIcon'
import { useModel } from './useMode'
import { type ModelApiresponse } from '../../../modules/shared/domain/types/responseTypes'

const Select = lazy(async () => await import('../../ui/select'))

interface Props {
  value: string
  onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  isForm?: boolean
  categoryId: number
  brandId: string
  isRequired: boolean
}

const ModelSelect: FC<Props> = ({ value = '', onChange, isForm = true, brandId, categoryId, isRequired }) => {
  const { repository } = useAppContext()
  const { models } = useModel(repository)

  const filterdModel = useMemo(() => {
    return (models as ModelApiresponse[]).filter(model => {
      const category = model.categoryId === categoryId || (categoryId === 0 || categoryId === undefined || categoryId === '')
      const brand = model.brandId === brandId || (brandId === 0 || brandId === undefined || brandId === '')
      return category && brand
    })
  }, [models, categoryId, brandId])

  return (
    <Suspense>
      <div className='w-full flex relative'>
        {isForm && <Link
          className='absolute -left-11'
          to={'/model/add'}
        >
          <AddIcon />
        </Link>}
        <Select
          label='Modelo'
          name='modelId'
          onChange={onChange}
          options={filterdModel}
          placeholder='-- Filtre por Modelo --'
          isHidden={false}
          isDisabled={false}
          value={value}
          isRequired={isRequired}
        />
        {isForm && <Link
          className='absolute -right-11'
          to={`/model/edit/${value}`}
          state={{}}
        >
          <EditIcon isDisbaled={value === ''} />
        </Link>}
      </div>
    </Suspense>
  )
}

export default ModelSelect
