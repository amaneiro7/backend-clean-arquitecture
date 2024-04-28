import { lazy, Suspense, useLayoutEffect, useMemo, useState } from "react";
import { OnHandleChange } from "../../../modules/shared/domain/types/types";
import { Primitives } from "../../../modules/shared/domain/value-object/Primitives";
import { useAppContext } from "../../Context/AppContext";
import { Operator } from "../../../modules/shared/domain/criteria/FilterOperators";
import { StatusId } from "../../../modules/devices/devices/status/domain/StatusId";
import { useHardDriveCapacity } from "../../Device/features/hardDrive/useHardDriveCapacity";
import { ComputerHDDCapacity } from "../../../modules/devices/fetures/computer/domain/ComputerHHDCapacity";
import { InputSkeletonLoading } from "../Loading/inputSkeletonLoading";

interface Props {
    value: Primitives<ComputerHDDCapacity>    
    status?: Primitives<StatusId>
    onChange: OnHandleChange
    type?: 'form' | 'search'
  }

  const ComboBox = lazy(async() => import("./combo_box"));  

export function HardDriveCapacityComboBox ({ value, status, onChange, type = 'search' }: Props) {
    const { repository } = useAppContext()
    const { hardDriveCapacity, loading } = useHardDriveCapacity(repository)
    const [errorMessage, setErrorMessage] = useState('')
    const [isError, setIsError] = useState(false)    
    const [isRequired, setIsRequired] = useState(false)

    const initialValue = useMemo(() => {
        return hardDriveCapacity.find(hddtype => hddtype.id === value)
    }, [hardDriveCapacity, value])

    useLayoutEffect(() => {
        if (type !== 'form') return;

        if (value === undefined) {      
          return
        }
    
        const isValid = ComputerHDDCapacity.isValid(value, status)
        setIsRequired(status === StatusId.StatusOptions.INUSE && type === 'form')
    
        setIsError(!isValid)
        setErrorMessage(isValid ? '' : ComputerHDDCapacity.invalidMessage())
    
        return () => {
          setErrorMessage('')
          setIsError(false)
        }
      }, [value, status])

    return (
        <Suspense fallback={<InputSkeletonLoading />}>
            <ComboBox
                id='hardDriveCapacityId'
                initialValue={initialValue}
                label="Capacidad de Disco Duro"
                name='hardDriveCapacityId'
                type={type}
                onChange={(_, newValue) => {
                    onChange('hardDriveCapacityId', newValue ? newValue.id : '', Operator.EQUAL)
                    
                }}
                options={hardDriveCapacity}
                isRequired={isRequired}
                placeholder='-- Filtre por Tamaño de Disco --'
                isDisabled={false}
                loading={loading}
                isError={isError}
                errorMessage={errorMessage}
            >
            </ComboBox>
        </Suspense>
    )
}