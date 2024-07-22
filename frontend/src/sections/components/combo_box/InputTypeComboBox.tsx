import { lazy, Suspense, useMemo } from "react"
import { OnHandleChange } from "../../../modules/shared/domain/types/types"
import { Operator } from "../../../modules/shared/domain/criteria/FilterOperators"
import { InputSkeletonLoading } from "../skeleton/inputSkeletonLoading"
import { InputTypePrimitives } from "../../../modules/devices/model/InputType/domain/InputType"
import { useAppContext } from "../../Context/AppProvider"

interface Props {
    value?: string
    onChange: OnHandleChange
    type?: 'form' | 'search'
}

const ComboBox = lazy(async () => import("./combo_box"))

export function InputTypeComboBox({ value, onChange, type = 'search' }: Props) {
    const { useInputType: { inputType, loading }} = useAppContext()

    const initialValue = useMemo(() => {
        return inputType.find(input => input.id === value)
    }, [inputType, value])

    return (
      <Suspense fallback={<InputSkeletonLoading />}>
        <ComboBox
          id='inputTypeId'
          initialValue={initialValue}
          label='Tipo de Entrada'
          name='inputTypeId'
          type={type}
          onChange={(_, newValue: InputTypePrimitives) => {
                    onChange('inputTypeId', newValue ? newValue.id : '', Operator.EQUAL)
                }}
          options={inputType}
          isDisabled={false}
          isRequired={type === 'form'}
          loading={loading}
        />
      </Suspense>
    )
}