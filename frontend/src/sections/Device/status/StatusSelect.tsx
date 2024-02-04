import { type ChangeEvent, type FC, Suspense, lazy } from 'react'
import { useAppContext } from '../../Context/AppContext'

const Select = lazy(async () => await import('../../ui/select'))

interface Props {
  value: number
  onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
}

const StatusSelect: FC<Props> = ({ value, onChange }) => {
  const { status } = useAppContext()
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
            />
        </Suspense>
  )
}

export default StatusSelect
