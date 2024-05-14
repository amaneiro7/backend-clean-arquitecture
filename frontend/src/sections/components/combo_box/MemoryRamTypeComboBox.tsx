import { lazy, Suspense, useMemo } from "react"
import { OnHandleChange } from "../../../modules/shared/domain/types/types"
import { InputSkeletonLoading } from "../skeleton/inputSkeletonLoading"
import { useMemoryRamType } from "../../Hooks/memoryRam/useMemoryRamType"

interface Props {
    value?: string
    onChange: OnHandleChange
    type?: 'form' | 'search'
}

const ComboBox = lazy(async () => import("./combo_box"))

export function MemoryRamTypeComboBox({ value, onChange, type = 'search' }: Props) {
    const { memoryRamTypes, loading } = useMemoryRamType()

    const initialValue = useMemo(() => {
        return memoryRamTypes.find(type => type.id === value)
    }, [memoryRamTypes, value])

    return (
        <Suspense fallback={<InputSkeletonLoading />}>
            <ComboBox
                id='memoryRamTypeId'
                initialValue={initialValue}
                label="Tipo de Memoria"
                name='memoryRamTypeId'
                type={type}
                onChange={(_, newValue) => {
                    onChange('memoryRamTypeId', newValue ? newValue.id : '')
                }}
                options={memoryRamTypes}
                isDisabled={false}
                isRequired={type === 'form'}
                loading={loading}
            >
            </ComboBox>
        </Suspense>
    )
}