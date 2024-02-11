import { type FC } from 'react'
import { MemoryRamCapacity } from '../../../../modules/devices/fetures/memoryRam/memoryRamCapacity/MemoryRamCapacity'

interface Props {
  value: number
  onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
}

const MemoryRamCapacityInput: FC<Props> = ({ value, onChange }) => {
  return (
    <label htmlFor="memory">
        <input
            id='memory'
            name="memoryRamCapacity"
            type="number"
            step={MemoryRamCapacity.minStep}
            min={MemoryRamCapacity.min}
            max={MemoryRamCapacity.max}
            placeholder='-- Ingrese la Memoria Ram (MB)'
            onChange={onChange}
            value={value}
            />
            Memoria Ram (MB)
    </label>
  )
}

export default MemoryRamCapacityInput
