import { lazy, Suspense, useMemo } from "react"
import { OnHandleChange } from "../../../modules/shared/domain/types/types"
import { Primitives } from "../../../modules/shared/domain/value-object/Primitives"
import { Operator } from "../../../modules/shared/domain/criteria/FilterOperators"
import { InputSkeletonLoading } from "../skeleton/inputSkeletonLoading"
import { StatusId } from "../../../modules/devices/devices/status/domain/StatusId"
import { useStatus } from "../../Hooks/status/useStatus"
import { StatusPrimitives } from "../../../modules/devices/devices/status/domain/Status"

interface Props {
    value: Primitives<StatusId>
    onChange: OnHandleChange
    type?: 'form' | 'search'
}

const ComboBox = lazy(async () => import("./combo_box"))

export default function StatusComboBox({ value, onChange, type = 'search' }: Props) {
    const { status, loading } = useStatus()

    const initialValue = useMemo(() => {
        return status.find(status => status.id === value)
    }, [status, value])

    return (
        <Suspense fallback={<InputSkeletonLoading />}>
            <ComboBox
                id='statusId'
                initialValue={initialValue}
                label="Estado"
                name='statusId'
                type={type}
                onChange={(_, newValue: StatusPrimitives) => {
                    onChange('statusId', newValue ? newValue.id : '', Operator.EQUAL)
                }}
                options={status}
                isRequired={type === 'form'}
                isDisabled={false}
                loading={loading}
            >
            </ComboBox>
        </Suspense>
    )
}