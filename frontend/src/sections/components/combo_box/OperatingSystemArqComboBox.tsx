import { lazy, useEffect, useMemo, useState } from "react"
import { useAppContext } from "../../Context/AppProvider"
import { Operator } from "../../../modules/shared/domain/criteria/FilterOperators"
import { ComputerOs } from "../../../modules/devices/fetures/computer/domain/ComputerOS"
import { ComputerOsArq } from "../../../modules/devices/fetures/computer/domain/ComputerOSArq"
import { type OperatingSystemArqPrimitives } from "../../../modules/devices/fetures/operatingSystem/operatingSystemArq/domain/OperatingSystemArq"
import { type OnHandleChange } from "../../../modules/shared/domain/types/types"
import { type Primitives } from "../../../modules/shared/domain/value-object/Primitives"

interface Props {
  value: Primitives<ComputerOsArq>
  operatingSystem?: Primitives<ComputerOs>
  onChange: OnHandleChange
  type?: 'form' | 'search'
}

const ComboBox = lazy(async () => import("./combo_box"))

export function OperatingSystemArqComboBox({ value, operatingSystem, onChange, type = 'search' }: Props) {
  const { useOperatingSystemArq: { operatingSystemArq, loading }} = useAppContext()
  const [errorMessage, setErrorMessage] = useState('')
  const [isError, setIsError] = useState(false)
  const [isDisabled, setIsDisabled] = useState(false)
  const [isRequired, setIsRequired] = useState(false)

  const initialValue = useMemo(() => {
    return operatingSystemArq.find(os => os.id === value)
  }, [operatingSystemArq, value])

  useEffect(() => {
    if (type !== 'form') return
    if (!operatingSystem) {
      setIsDisabled(true)
    } else {
      setIsDisabled(false)
    }

    if (value === undefined) {
      return
    }

    const isValid = ComputerOsArq.isValid(value, operatingSystem)
    setIsRequired(type === 'form' && !!operatingSystem)


    setIsError(!isValid)
    setErrorMessage(isValid ? '' : ComputerOsArq.invalidMessage())

    return () => {
      setErrorMessage('')
      setIsError(false)
    }
  }, [value, operatingSystem, type])

  return (
    <>
      <ComboBox
        id='operatingSystemArqId'
        initialValue={initialValue}
        label='Arquitectura'
        name='operatingSystemArqId'
        type={type}
        onChange={(_, newValue: OperatingSystemArqPrimitives) => {
          onChange('operatingSystemArqId', newValue ? newValue.id : '', Operator.EQUAL)

        }}
        options={operatingSystemArq}
        isRequired={isRequired}
        isDisabled={isDisabled}
        loading={loading}
        isError={isError}
        errorMessage={errorMessage}
      />
    </>
  )
}