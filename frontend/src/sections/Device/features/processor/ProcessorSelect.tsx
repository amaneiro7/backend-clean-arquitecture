import { useMemo, Suspense, lazy } from 'react'
import { Link } from 'react-router-dom'
import { useAppContext } from '../../../Context/AppContext'
import { useProcessor } from './useProcessor'
import { AddIcon } from '../../../ui/icon/AddIcon'
import { EditIcon } from '../../../ui/icon/EditIcon'
import { type OnHandleChange } from '../../../../modules/shared/domain/types/types'
import { Operator } from '../../../../modules/shared/domain/criteria/FilterOperators'

const Select = lazy(async () => await import('../../../components/Select/Select'))

interface Props {
  value: string | null
  onChange: OnHandleChange
  isForm?: boolean
  isRequired?: boolean
}

export default function ProcessorSelect ({ value = '', onChange, isForm = true, isRequired }: Props) {
  const { repository } = useAppContext()
  const { processors } = useProcessor(repository)
  const processorOptions = useMemo(() => processors.map((processor) => ({
    id: processor.id,
    name: processor.numberModel
  })), [processors])

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
                 onChange={(event) => {
                   const { name, value } = event.target
                   onChange(name, value, Operator.EQUAL)
                 }}
                 options={processorOptions}
                 placeholder='-- Filtre por Procesador --'
                 isRequired={isRequired}
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
