import { lazy, Suspense, useMemo } from "react";
import { OnHandleChange } from "../../../modules/shared/domain/types/types";
import { Primitives } from "../../../modules/shared/domain/value-object/Primitives";
import { useAppContext } from "../../Context/AppContext";
import { Operator } from "../../../modules/shared/domain/criteria/FilterOperators";
import { InputSkeletonLoading } from "../Loading/inputSkeletonLoading";
import { StatusId } from "../../../modules/devices/devices/status/domain/StatusId";
import { useStatus } from "../../Device/status/useStatus";

interface Props {
    value: Primitives<StatusId>    
    onChange: OnHandleChange
    type?: 'form' | 'search'
  }

  const ComboBox = lazy(async() => import("./combo_box"));  

export default function StatusComboBox ({ value, onChange, type = 'search' }: Props) {
    const { repository } = useAppContext()
    const { status, loading } = useStatus(repository)

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
                onChange={(_, newValue) => {
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