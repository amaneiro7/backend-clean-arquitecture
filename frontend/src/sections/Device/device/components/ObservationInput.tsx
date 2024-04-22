import FormInput from '../../../ui/text-field'
import { type Primitives } from '../../../../modules/shared/domain/value-object/Primitives'
import { type OnHandleChange } from '../../../../modules/shared/domain/types/types'
import { Operator } from '../../../../modules/shared/domain/criteria/FilterOperators'
import { type DeviceObservation } from '../../../../modules/devices/devices/devices/domain/DeviceObservation'

interface Props {
  value: Primitives<DeviceObservation>
  onChange: OnHandleChange
  isForm?: boolean
}

export default function ObservationInput ({ value, onChange }: Props) {
  return (
    <FormInput
        id='observation'
        isRequired={false}
        name="observation"
        type="textarea"
        label='Observacion'
        placeholder=''
        handle={(event) => {
          const { name, value } = event.target
          onChange(name, value, Operator.CONTAINS)
        }}
        value={value}
    />
  )
}
