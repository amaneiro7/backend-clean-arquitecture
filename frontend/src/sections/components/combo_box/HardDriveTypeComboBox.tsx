import { lazy, Suspense, useEffect, useLayoutEffect, useMemo, useState } from "react";
import { OnHandleChange } from "../../../modules/shared/domain/types/types";
import { Primitives } from "../../../modules/shared/domain/value-object/Primitives";
import { useAppContext } from "../../Context/AppContext";
import { Operator } from "../../../modules/shared/domain/criteria/FilterOperators";
import { CategoryId } from "../../../modules/devices/category/domain/CategoryId";
import { InputSkeletonLoading } from "../Loading/inputSkeletonLoading";
import { useHardDriveType } from "../../Device/features/hardDrive/useHardDriveType";
import { ComputerHDDType } from "../../../modules/devices/fetures/computer/domain/ComputerHDDtype";
import { ComputerHDDCapacity } from "../../../modules/devices/fetures/computer/domain/ComputerHHDCapacity";

interface Props {
    value: Primitives<CategoryId>    
    hardDriveCapacity?: Primitives<ComputerHDDCapacity>
    onChange: OnHandleChange
    type?: 'form' | 'search'
  }

  const ComboBox = lazy(async() => import("./combo_box"));  

export default function HardDriveTypeComboBox ({ value, hardDriveCapacity, onChange, type = 'search' }: Props) {
    const { repository } = useAppContext()
    const { hardDriveType, loading } = useHardDriveType(repository)
    const [errorMessage, setErrorMessage] = useState('')
    const [isError, setIsError] = useState(false)
    const [isDisabled, setIsDisabled] = useState(false)

    const initialValue = useMemo(() => {
        return hardDriveType.find(hddtype => hddtype.id === value)
    }, [hardDriveType, value])

    useEffect(() => {
        if (type !== 'form') return;

        if (value === undefined) {      
          return
        }
    
        const isValid = ComputerHDDType.isValid(value, hardDriveCapacity)
        setIsDisabled(hardDriveCapacity === '')
    
        setIsError(!isValid)
        setErrorMessage(isValid ? '' : ComputerHDDType.invalidMessage())
    
        return () => {
          setErrorMessage('')
          setIsError(false)
        }
      }, [value, hardDriveCapacity])

      useLayoutEffect(() => {
        if (isDisabled) {
          onChange('hardDriveTypeId', '')
        }
      }, [isDisabled])

    return (
        <Suspense fallback={<InputSkeletonLoading />}>
            <ComboBox
                id='hardDriveTypeId'
                initialValue={initialValue}
                label="Tipo de Disco Duro"
                name='hardDriveTypeId'
                type={type}
                onChange={(_, newValue) => {
                    onChange('hardDriveTypeId', newValue ? newValue.id : '', Operator.EQUAL)
                    
                }}
                options={hardDriveType}
                isRequired={!isDisabled}
                isDisabled={isDisabled}
                loading={loading}
                isError={isError}
                errorMessage={errorMessage}
            >
            </ComboBox>
        </Suspense>
    )
}