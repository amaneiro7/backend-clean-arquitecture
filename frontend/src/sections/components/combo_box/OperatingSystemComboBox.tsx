import { lazy, Suspense, useEffect, useMemo, useState } from "react"
import { OnHandleChange } from "../../../modules/shared/domain/types/types"
import { type Primitives } from "../../../modules/shared/domain/value-object/Primitives"
import { Operator } from "../../../modules/shared/domain/criteria/FilterOperators"
import { StatusId } from "../../../modules/devices/devices/status/domain/StatusId"
import { ComputerHDDCapacity } from "../../../modules/devices/fetures/computer/domain/ComputerHHDCapacity"
import { InputSkeletonLoading } from "../skeleton/inputSkeletonLoading"
import { ComputerOs } from "../../../modules/devices/fetures/computer/domain/ComputerOS"
import { type OperatingSystemPrimitives } from "../../../modules/devices/fetures/operatingSystem/operatingSystem/domain/OperatingSystem"
import { useAppContext } from "../../Context/AppProvider"

interface Props {
  value: Primitives<ComputerOs>
  status?: Primitives<StatusId>
  hardDriveCapacity?: Primitives<ComputerHDDCapacity>
  onChange: OnHandleChange
  type?: 'form' | 'search'
}

const ComboBox = lazy(async () => import("./combo_box"))

export function OperatingSystemComboBox({ value, status, hardDriveCapacity, onChange, type = 'search' }: Props) {
  const { useOperatingSystemVersions: { operatingSystem, loading } } = useAppContext()
  const [errorMessage, setErrorMessage] = useState('')
  const [isError, setIsError] = useState(false)
  const [isDisabled, setIsDisabled] = useState(false)
  const [isRequired, setIsRequired] = useState(false)

  const initialValue = useMemo(() => {
    return operatingSystem.find(os => os.id === value)
  }, [operatingSystem, value])

  useEffect(() => {
    if (type !== 'form') return
    
    if (StatusId.StatusOptions.INUSE !== status || hardDriveCapacity === '') {      
      setIsDisabled(true)
    } else {
      setIsDisabled(false)
    }

    if (value === undefined) {
      return
    }

    const isValid = ComputerOs.isValid(value, status, hardDriveCapacity)
    // Se valida si el dispositivo no esta en uso o si la capcidad del disco duro esta vacio
    // si alguna de las conficiones es verdadera, el campo se deshabilita y el valor del campo queda en blanco
    setIsRequired(type === 'form' && StatusId.StatusOptions.INUSE === status)

    setIsError(!isValid)
    setErrorMessage(isValid ? '' : ComputerOs.invalidMessage())

    return () => {
      setErrorMessage('')
      setIsError(false)
    }
  }, [value, status, hardDriveCapacity, type])

  return (
    <Suspense fallback={<InputSkeletonLoading />}>
      <ComboBox
        id='operatingSystemId'
        initialValue={initialValue}
        label='Sistemas Operativo'
        name='operatingSystemId'
        type={type}
        onChange={(_, newValue: OperatingSystemPrimitives) => {
          onChange('operatingSystemId', newValue ? newValue.id : '', Operator.EQUAL)

        }}
        options={operatingSystem}
        isRequired={isRequired}
        isDisabled={isDisabled}
        loading={loading}
        isError={isError}
        errorMessage={errorMessage}
      />
    </Suspense>
  )
}