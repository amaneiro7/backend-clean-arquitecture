import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useAppContext } from '../../Context/AppContext'
import { type Primitives } from '../../../modules/shared/domain/value-object/Primitives'
import { type EmployeeName } from '../../../modules/employee/employee/domain/Name'
import { type EmployeeLastName } from '../../../modules/employee/employee/domain/LastName'
import { type EmployeeUserName } from '../../../modules/employee/employee/domain/UserName'
import { type Cedula } from '../../../modules/employee/employee/domain/Cedula'
import { type LocationId } from '../../../modules/location/locations/domain/locationId'
import { type EmployeeEmail } from '../../../modules/employee/employee/domain/EmployeeEmail'
import { type Extension } from '../../../modules/employee/employee/domain/Extension'
import { type PhoneNumber } from '../../../modules/employee/employee/domain/PhoneNumber'
import { type CargoId } from '../../../modules/employee/cargo/domain/CargoId'
import { type VicepresidenciaEjecutivaId } from '../../../modules/employee/area/vicepresidenciaejecutiva/domain/VicepresidenciaEjecutivaId'
import { type VicepresidenciaId } from '../../../modules/employee/area/vicepresidencia/domain/VicepresidenciaId'
import { type GerenciaId } from '../../../modules/employee/area/gerencia/domain/GerenciaId'
import { type CoordinacionId } from '../../../modules/employee/area/coordinacion/domain/CoordinacionId'
import { useEffect, useState } from 'react'

interface defaultProps {
  name: Primitives<EmployeeName>
  lastName: Primitives<EmployeeLastName>
  userName: Primitives<EmployeeUserName>
  cedula: Primitives<Cedula>
  locationId: Primitives<LocationId>
  email: Primitives<EmployeeEmail>
  extension: Primitives<Extension>
  phoneNumber: Primitives<PhoneNumber>
  cargoId: Primitives<CargoId>
  vicepresidenciaEjecutivaId: Primitives<VicepresidenciaEjecutivaId>
  vicepresidenciaId: Primitives<VicepresidenciaId>
  gerenciaId: Primitives<GerenciaId>
  coordinacionId: Primitives<CoordinacionId>
}

const defaultInitialState: defaultProps = {
  name: '',
  lastName: '',
  userName: '',
  cedula: 0,
  locationId: '',
  email: '',
  extension: '',
  phoneNumber: '',
  cargoId: '',
  vicepresidenciaEjecutivaId: '',
  vicepresidenciaId: '',
  gerenciaId: '',
  coordinacionId: ''
}

export const useEmployeeInitialState = () => {
  const { id } = useParams()
  const location = useLocation()
  const navidate = useNavigate()
  const { employee: { getEmployee } } = useAppContext()
  const [preloadedEmployeeState, setPreloadedEmployeeState] = useState(defaultInitialState)

  useEffect(() => {
    if (location.pathname.includes('add')) {
      setPreloadedEmployeeState(defaultInitialState)
      return
    }

    if (location.state?.state !== undefined) {
      const { state } = location.state
      setPreloadedEmployeeState(state)
    } else if (id === undefined) {
      navidate('/error')
    } else {
      getEmployee.getById(id)
        .then(employee => {
          const { name, lastName, userName, cedula, locationId, email, extension, phoneNumber, cargoId, vicepresidenciaEjecutivaId, vicepresidenciaId, gerenciaId, coordinacionId } = employee
          setPreloadedEmployeeState({ name, lastName, userName, cedula, locationId, email, extension, phoneNumber, cargoId, vicepresidenciaEjecutivaId, vicepresidenciaId, gerenciaId, coordinacionId })
        })
        .catch(error => {
          console.error('useEmployeeInitialState', error)
        })
    }
  }, [id, location.state?.state])

  return {
    preloadedEmployeeState
  }
}
