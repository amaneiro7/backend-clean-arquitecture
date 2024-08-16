import { lazy, Suspense, useEffect, useMemo, useState } from "react"
import { type OnHandleChange } from "../../../modules/shared/domain/types/types"
import { type Primitives } from "../../../modules/shared/domain/value-object/Primitives"
import { type HardDrivePrimitives } from "../../../modules/devices/fetures/hardDrive/hardDrive/domain/HardDrive"
import { StatusId } from "../../../modules/devices/devices/status/domain/StatusId"
import { Operator } from "../../../modules/shared/domain/criteria/FilterOperators"
import { ComputerHDDCapacity } from "../../../modules/devices/fetures/computer/domain/ComputerHHDCapacity"
import { InputSkeletonLoading } from "../skeleton/inputSkeletonLoading"
import { useAppContext } from "../../Context/AppProvider"

interface Props {
    value: Primitives<ComputerHDDCapacity>    
    status?: Primitives<StatusId>
    onChange: OnHandleChange
    type?: 'form' | 'search'
  }

  const ComboBox = lazy(async() => import("./combo_box"))  

export function HardDriveCapacityComboBox ({ value, status, onChange, type = 'search' }: Props) {
    const { useHardDriveCapacity: { hardDriveCapacity, loading } } = useAppContext()
    const [errorMessage, setErrorMessage] = useState('')
    const [isError, setIsError] = useState(false)    
    const [isRequired, setIsRequired] = useState(false)

    const initialValue = useMemo(() => {
        return hardDriveCapacity.find(hddtype => hddtype.id === value)
    }, [hardDriveCapacity, value])

    useEffect(() => {
        if (type !== 'form') return

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
      }, [value, status, type])

    return (
      <Suspense fallback={<InputSkeletonLoading />}>
        <ComboBox
          id='hardDriveCapacityId'
          initialValue={initialValue}
          label='Disco Duro'
          name='hardDriveCapacityId'
          type={type}
          onChange={(_, newValue: HardDrivePrimitives) => {
                    onChange('hardDriveCapacityId', newValue ? newValue.id : '', Operator.EQUAL)
                    
                }}
          options={hardDriveCapacity}
          isRequired={isRequired}
          isDisabled={false}
          loading={loading}
          isError={isError}
          errorMessage={errorMessage}
        />
      </Suspense>
    )
}