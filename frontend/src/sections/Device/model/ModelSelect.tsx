import { type ChangeEvent, type FC, Suspense, lazy } from 'react'
import { useAppContext } from '../../Context/AppContext'
import { Link } from 'react-router-dom'
import { AddIcon } from '../../ui/icon/AddIcon'
import { EditIcon } from '../../ui/icon/EditIcon'

const Select = lazy(async () => await import('../../ui/select'))

interface Props {
  value: string
  onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
}

const ModelSelect: FC<Props> = ({ value, onChange }) => {
  const { models } = useAppContext()
  return (
    <Suspense>
      <div className='w-full flex relative'>
        <Link
          className='absolute -left-11'
          to={'/model/add'}
        >
          <AddIcon />
        </Link>
        <Select
          label='Modelo'
          name='modelId'
          onChange={onChange}
          options={models}
          placeholder='-- Filtre por Modelo --'
          isHidden={false}
          isDisabled={false}
          value={value}
        />
        <Link
          className='absolute -right-11'
          to={`/model/edit/${value}`}
          state={{}}
        >
          <EditIcon isDisbaled={value === ''} />
        </Link>
      </div>
    </Suspense>
  )
}

export default ModelSelect
