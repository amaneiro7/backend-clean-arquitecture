import { type ChangeEvent, type FC, Suspense, lazy } from 'react'
import { useAppContext } from '../../Context/AppContext'
import { useStatus } from './useStatus'

const Select = lazy(async () => await import('../../ui/select'))

interface Props {
  value: number | string
  onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  isRequired: boolean
}

const StatusSelect: FC<Props> = ({ value, onChange, isRequired }) => {
  const { repository } = useAppContext()
  const { status } = useStatus(repository)
  return (
        <Suspense>
            <Select
                 label='Estado'
                 name='statusId'
                 onChange={onChange}
                 options={status}
                 placeholder='-- Filtre por Estado --'
                 isHidden={false}
                 isDisabled={false}
                 value={value}
                 defaultValue={value}
                 isRequired={isRequired}
            />
        </Suspense>
  )
}

export default StatusSelect
