import { lazy, useMemo } from "react"
import { useAppContext } from "../../Context/AppProvider"
import { type OnHandleChange } from "../../../modules/shared/domain/types/types"
import { type MemoryRamTypePrimitives } from "../../../modules/devices/fetures/memoryRam/memoryRamType/domain/MemoryRamType"

interface Props {
    value?: string
    onChange: OnHandleChange
    type?: 'form' | 'search'
}

const ComboBox = lazy(async () => import("./combo_box"))

export function MemoryRamTypeComboBox({ value, onChange, type = 'search' }: Props) {
    const { useMemoryRamType: { memoryRamTypes, loading } } = useAppContext()

    const initialValue = useMemo(() => {
        return memoryRamTypes.find(type => type.id === value)
    }, [memoryRamTypes, value])

    return (
      <>
        <ComboBox
          id='memoryRamTypeId'
          initialValue={initialValue}
          label='Tipo de Memoria'
          name='memoryRamTypeId'
          type={type}
          onChange={(_, newValue: MemoryRamTypePrimitives) => {
                    onChange('memoryRamTypeId', newValue ? newValue.id : '')
                }}
          options={memoryRamTypes}
          isDisabled={false}
          isRequired={type === 'form'}
          loading={loading}
        />
      </>
    )
}