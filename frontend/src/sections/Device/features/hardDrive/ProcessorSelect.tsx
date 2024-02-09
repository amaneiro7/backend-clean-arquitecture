import { type ChangeEvent, type FC, Suspense, lazy } from 'react'
import { Link } from 'react-router-dom'
import { useAppContext } from '../../../Context/AppContext'
import { useProcessor } from './useHardDrive'
import { AddIcon } from '../../../ui/icon/AddIcon'
import { EditIcon } from '../../../ui/icon/EditIcon'

const Select = lazy(async () => await import('../../../ui/select'))

interface Props {
  value: string
  onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  isForm?: boolean
}

const ProcessorSelect: FC<Props> = ({ value, onChange, isForm = true }) => {
  const { repository } = useAppContext()
  const { processors } = useProcessor(repository)
  return (
        <Suspense>
          <div className='w-full flex relative'>
            {isForm && <Link
              className='absolute -left-11'
              to={'/processor/add'}
            >
              <AddIcon />
            </Link>}
            <Select
                 label='Procesador'
                 name='processorId'
                 onChange={onChange}
                 options={processors}
                 placeholder='-- Filtre por Procesador --'
                 isHidden={false}
                 isDisabled={false}
                 value={value}
            />
            {isForm && <Link
              className='absolute -right-11'
              to={`/processor/edit/${value}`}
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

export default ProcessorSelect
