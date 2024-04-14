import { useSearchParams } from 'react-router-dom'
import { type EmployeePrimitives } from '../../../modules/employee/employee/domain/Employee'

type UpdateInputData = ({ name, value }: inputDataType) => void
interface inputDataType { name: string, value: string }

export const useInputsData = (): {
  inputData: Pick<EmployeePrimitives, 'userName' | 'name' | 'lastName' | 'email' | 'cargoId' | 'locationId' | 'vicepresidenciaEjecutivaId' | 'vicepresidenciaId' | 'gerenciaId' | 'coordinacionId'>
  updateInputData: UpdateInputData
  clearInputs: () => void
} => {
  const [searchParams, setSearchParams] = useSearchParams()

  const updateInputData = ({ name, value }: inputDataType) => {
    if (value === '') {
      setSearchParams(prev => {
        prev.delete(name)
        return prev
      })
    } else {
      setSearchParams(prev => {
        prev.set(name, value)
        return prev
      })
    }
  }

  const clearInputs = () => {
    setSearchParams('')
  }

  const inputData = {
    userName: searchParams.get('userName') ?? '',
    name: searchParams.get('name') ?? '',
    lastName: searchParams.get('lastName') ?? '',
    email: searchParams.get('email') ?? '',
    cargoId: searchParams.get('cargoId') ?? '',
    locationId: searchParams.get('locationId') ?? '',
    vicepresidenciaEjecutivaId: searchParams.get('vicepresidenciaEjecutivaId') ?? '',
    vicepresidenciaId: searchParams.get('vicepresidenciaId') ?? '',
    gerenciaId: searchParams.get('gerenciaId') ?? '',
    coordinacionId: searchParams.get('coordinacionId') ?? ''
  }

  return {
    inputData,
    updateInputData,
    clearInputs
  }
}
