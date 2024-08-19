import { lazy, useMemo } from "react"
import { OnHandleChange } from "../../../modules/shared/domain/types/types"
import { Primitives } from "../../../modules/shared/domain/value-object/Primitives"
import { Operator } from "../../../modules/shared/domain/criteria/FilterOperators"
import { StatusId } from "../../../modules/devices/devices/status/domain/StatusId"
import { useAppContext } from "../../Context/AppProvider"
import { type StatusPrimitives } from "../../../modules/devices/devices/status/domain/Status"

interface Props {
    value: Primitives<StatusId>
    onChange: OnHandleChange
    type?: 'form' | 'search'
}

const ComboBox = lazy(async () => import("./combo_box"))

export default function StatusComboBox({ value, onChange, type = 'search' }: Props) {
    const { useStatus: { status, loading }} = useAppContext()

    const initialValue = useMemo(() => {
        return status.find(status => status.id === value)
    }, [status, value])

    return (
      <ComboBox
        id='statusId'
        initialValue={initialValue}
        label='Estatus'
        name='statusId'
        type={type}
        onChange={(_, newValue: StatusPrimitives) => {
                    onChange('statusId', newValue ? newValue.id : '', Operator.EQUAL)
                    if (type === 'form') {
                        onChange('locationId', '')
                    }
                }}
        options={status}
        isRequired={type === 'form'}
        isDisabled={false}
        loading={loading}
      />
    )
}