import { type FC } from 'react'
import { HardDriveHealth } from '../../../../modules/devices/fetures/hardDrive/hardDrive/domain/HardDriveHealth'

interface Props {
  value: number
  onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
}

const HealthInput: FC<Props> = ({ value, onChange }) => {
  return (
    <label htmlFor="memory">
        <input
            name="health"
            type="number"
            min={HardDriveHealth.NAME_MIN_LENGTH}
            max={HardDriveHealth.NAME_MAX_LENGTH}
            placeholder='-- Ingrese la salud del Disco Duro (%)'
            onChange={onChange}
            value={value}
            />
            Memoria Ram (MB)
    </label>
  )
}

export default HealthInput
