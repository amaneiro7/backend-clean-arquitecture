import { type DevicePrimitives } from '../../../../Device/Device/domain/Device'
import { type LocationPrimitives } from '../../../../Location/Location/domain/Location'
import { type LocationId } from '../../../../Location/Location/domain/LocationId'
import { type Primitives } from '../../../../Shared/domain/value-object/Primitives'
import { type UserEmail } from '../../../../User/user/domain/UserEmail'
import { type CoordinacionPrimitives } from '../../../Area/Coordinacion/domain/Coordinacion'
import { type CoordinacionId } from '../../../Area/Coordinacion/domain/CoordinacionId'
import { type GerenciaPrimitives } from '../../../Area/Gerencia/domain/Gerencia'
import { type GerenciaId } from '../../../Area/Gerencia/domain/GerenciaId'
import { type VicepresidenciaPrimitives } from '../../../Area/VicePresidencia/domain/vicepresidencia'
import { type VicepresidenciaId } from '../../../Area/VicePresidencia/domain/vicepresidenciaId'
import { type VicepresidenciaEjecutivaPrimitives } from '../../../Area/VicepresidenciaEjecutiva/domain/VicepresidenciaEjecutiva'
import { type VicepresidenciaEjecutivaId } from '../../../Area/VicepresidenciaEjecutiva/domain/VicepresidenciaEjecutivaId'
import { type CargoPrimitives } from '../../../Cargo/domain/Cargo'
import { type CargoId } from '../../../Cargo/domain/CargoId'
import { type EmployeeCedula } from '../../domain/EmployeeCedula'
import { type EmployeeId } from '../../domain/EmployeeId'
import { type EmployeeLastName } from '../../domain/EmployeeLastName'
import { type EmployeeName } from '../../domain/EmployeeName'
import { type EmployeeUserName } from '../../domain/EmployeeUsername'
import { type Extension } from '../../domain/Extension'
import { type PhoneNumber } from '../../domain/PhoneNumber'

export interface EmployeesApiResponse {
  id: Primitives<EmployeeId>
  userName: Primitives<EmployeeUserName>
  name: Primitives<EmployeeName>
  lastName: Primitives<EmployeeLastName>
  cedula: Primitives<EmployeeCedula>
  locationId: Primitives<LocationId>
  email: Primitives<UserEmail>
  extension: Primitives<Extension>
  cargoId: Primitives<CargoId>
  phoneNumber: Primitives<PhoneNumber>
  vicepresidenciaEjecutivaId: Primitives<VicepresidenciaEjecutivaId>
  vicepresidenciaId: Primitives<VicepresidenciaId>
  gerenciaId: Primitives<GerenciaId>
  coordinacionId: Primitives<CoordinacionId>
  createdAt: Date
  updatedAt: Date
  cargo: CargoPrimitives
  location: LocationPrimitives
  vicepresidenciaEjecutiva: VicepresidenciaEjecutivaPrimitives
  vicepresidencia: VicepresidenciaPrimitives
  gerencia: GerenciaPrimitives
  coordinacion: CoordinacionPrimitives
  devices: DevicePrimitives[]
}
