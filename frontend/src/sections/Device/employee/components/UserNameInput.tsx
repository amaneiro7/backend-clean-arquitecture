
import FormInput from '../../../ui/text-field'
import { type Primitives } from '../../../../modules/shared/domain/value-object/Primitives'
import { type OnHandleChange } from '../../../../modules/shared/domain/types/types'
import { Operator } from '../../../../modules/shared/domain/criteria/FilterOperators'
import { EmployeeUserName } from '../../../../modules/employee/employee/domain/UserName'

interface Props {
  value: Primitives<EmployeeUserName>
  onChange: OnHandleChange
  type?: 'form' | 'dialog' | 'search'
}

export default function EmployeeUserNameInput ({ value, onChange, type = 'search'}: Props) { 
  return (
    <FormInput
        id='userName'
        isRequired={type === 'form'}
        name="userName"
        type="text"
        label='Nombre de Usuario'
        placeholder='-- Ingrese el usuario'
        handle={(event) => {
          const { name, value } = event.target
          onChange(name, value, Operator.EQUAL)
        }}
        value={value}
    />
  )
}
