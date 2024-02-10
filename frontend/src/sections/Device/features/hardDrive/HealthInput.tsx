import { HardDriveHealth } from '../../../../modules/devices/fetures/hardDrive/hardDrive/domain/HardDriveHealth'
import { type FC } from 'react'
import NumberInput from '../../../ui/number-field'

interface Props {
  value: number
  onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
}

const HealthInput: FC<Props> = ({ value, onChange }) => {
  return (
    <NumberInput
      name='health'
      label='Health'
      onChange={onChange}
      placeholder='Enter health...'
      value={value}
      max={HardDriveHealth.NAME_MAX_LENGTH}
      min={HardDriveHealth.NAME_MIN_LENGTH}
    />
  )
}

export default HealthInput
