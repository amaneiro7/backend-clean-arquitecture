import { type FC, Suspense, lazy } from 'react'
import { Link } from 'react-router-dom'
import { useAppContext } from '../../../Context/AppContext'
import { useProcessor } from './useProcessor'
import { AddIcon } from '../../../ui/icon/AddIcon'
import { EditIcon } from '../../../ui/icon/EditIcon'
import { type ProcessorApiresponse } from '../../../../modules/shared/domain/types/responseTypes'
import { type OnHandleChange } from '../../../../modules/shared/domain/types/types'
import { Operator } from '../../../../modules/shared/domain/criteria/FilterOperators'

const Select = lazy(async () => await import('../../../ui/Select'))

interface Props {
  value: string | null
  onChange: OnHandleChange
  isForm?: boolean
  isRequired?: boolean
}

const ProcessorSelect: FC<Props> = ({ value = '', onChange, isForm = true, isRequired }) => {
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
                 onChange={(event) => {
                   const { name, value } = event.target
                   onChange(name, value, Operator.EQUAL)
                 }}
                 options={processors as ProcessorApiresponse[]}
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

export default ProcessorSelect
