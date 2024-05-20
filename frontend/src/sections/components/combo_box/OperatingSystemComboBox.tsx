import { lazy, Suspense, useLayoutEffect, useMemo, useState } from "react"
import { OnHandleChange } from "../../../modules/shared/domain/types/types"
import { Primitives } from "../../../modules/shared/domain/value-object/Primitives"
import { Operator } from "../../../modules/shared/domain/criteria/FilterOperators"
import { StatusId } from "../../../modules/devices/devices/status/domain/StatusId"
import { ComputerHDDCapacity } from "../../../modules/devices/fetures/computer/domain/ComputerHHDCapacity"
import { InputSkeletonLoading } from "../skeleton/inputSkeletonLoading"
import { ComputerOs } from "../../../modules/devices/fetures/computer/domain/ComputerOS"
import { useOperatingSystemVersions } from "../../Hooks/operatingSystem/useOperatingSystemVersion"
import { OperatingSystemPrimitives } from "../../../modules/devices/fetures/operatingSystem/operatingSystem/domain/OperatingSystem"

interface Props {
  value: Primitives<ComputerOs>
  status?: Primitives<StatusId>
  hardDriveCapacity?: Primitives<ComputerHDDCapacity>
  onChange: OnHandleChange
  type?: 'form' | 'search'
}

const ComboBox = lazy(async () => import("./combo_box"))

export function OperatingSystemComboBox({ value, status, hardDriveCapacity, onChange, type = 'search' }: Props) {
  const { operatingSystem, loading } = useOperatingSystemVersions()
  const [errorMessage, setErrorMessage] = useState('')
  const [isError, setIsError] = useState(false)
  const [isDisabled, setIsDisabled] = useState(false)
  const [isRequired, setIsRequired] = useState(false)

  const initialValue = useMemo(() => {
    return operatingSystem.find(os => os.id === value)
  }, [operatingSystem, value])

  useLayoutEffect(() => {
    if (type !== 'form') return

    if (value === undefined) {
      return
    }

    const isValid = ComputerOs.isValid(value, status, hardDriveCapacity)
    setIsDisabled(StatusId.StatusOptions.INUSE !== status || hardDriveCapacity === '')
    setIsRequired(type === 'form' && StatusId.StatusOptions.INUSE === status)

    setIsError(!isValid)
    setErrorMessage(isValid ? '' : ComputerOs.invalidMessage())

    return () => {
      setErrorMessage('')
      setIsError(false)
    }
  }, [value, status, hardDriveCapacity])

  useLayoutEffect(() => {
    if (isDisabled) {
      onChange('operatingSystemId', '')
    }
  }, [isDisabled])

  return (
    <Suspense fallback={<InputSkeletonLoading />}>
      <ComboBox
        id='operatingSystemId'
        initialValue={initialValue}
        label="Sistemas Operativo"
        name='operatingSystemId'
        type={type}
        onChange={(_, newValue: OperatingSystemPrimitives) => {
          onChange('operatingSystemId', newValue ? newValue.id : '', Operator.EQUAL)

        }}
        options={operatingSystem}
        isRequired={isRequired}
        placeholder='-- Filtre por Sistema Operativo --'
        isDisabled={isDisabled}
        loading={loading}
        isError={isError}
        errorMessage={errorMessage}
      >
      </ComboBox>
    </Suspense>
  )
}