import { lazy, useEffect, useMemo, useState } from "react"
import { useAppContext } from "../../Context/AppProvider"
import { ComputerHDDType } from "../../../modules/devices/fetures/computer/domain/ComputerHDDtype"
import { Operator } from "../../../modules/shared/domain/criteria/FilterOperators"
import { type ComputerHDDCapacity } from "../../../modules/devices/fetures/computer/domain/ComputerHHDCapacity"
import { type CategoryId } from "../../../modules/devices/category/domain/CategoryId"
import { type Primitives } from "../../../modules/shared/domain/value-object/Primitives"
import { type OnHandleChange } from "../../../modules/shared/domain/types/types"
import { type HardDriveTypePrimitives } from "../../../modules/devices/fetures/hardDrive/hardDriveType/domain/HardDriveType"

interface Props {
  value: Primitives<CategoryId>
  hardDriveCapacity?: Primitives<ComputerHDDCapacity>
  onChange: OnHandleChange
  type?: 'form' | 'search'
}

const ComboBox = lazy(async () => import("./combo_box"))

export default function HardDriveTypeComboBox({ value, hardDriveCapacity, onChange, type = 'search' }: Props) {
  const { useHardDriveType: { hardDriveType, loading } } = useAppContext()
  const [errorMessage, setErrorMessage] = useState('')
  const [isError, setIsError] = useState(false)
  const [isDisabled, setIsDisabled] = useState(false)

  const initialValue = useMemo(() => {
    return hardDriveType.find(hddtype => hddtype.id === value)
  }, [hardDriveType, value])

  useEffect(() => {
    if (type !== 'form') return
    
    if (!hardDriveCapacity) {
      setIsDisabled(true)
    } else {
      setIsDisabled(false)
    }

    if (value === undefined) {
      return
    }

    const isValid = ComputerHDDType.isValid(value, hardDriveCapacity)

    setIsError(!isValid)
    setErrorMessage(isValid ? '' : ComputerHDDType.invalidMessage())

    return () => {
      setErrorMessage('')
      setIsError(false)
    }
  }, [value, hardDriveCapacity, type])

  return (
    <>
      <ComboBox
        id='hardDriveTypeId'
        initialValue={initialValue}
        label='Tipo'
        name='hardDriveTypeId'
        type={type}
        onChange={(_, newValue: HardDriveTypePrimitives) => {
          onChange('hardDriveTypeId', newValue ? newValue.id : '', Operator.EQUAL)

        }}
        options={hardDriveType}
        isRequired={!isDisabled}
        isDisabled={isDisabled}
        loading={loading}
        isError={isError}
        errorMessage={errorMessage}
      />
    </>
  )
}