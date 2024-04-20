import { LocationId } from '../../../Location/Location/domain/LocationId'
import { type Primitives } from '../../../Shared/domain/value-object/Primitives'
import { UserEmail } from '../../../User/user/domain/UserEmail'
import { VicepresidenciaEjecutivaId } from '../../Area/VicepresidenciaEjecutiva/domain/VicepresidenciaEjecutivaId'
import { CargoId } from '../../Cargo/domain/CargoId'
import { EmployeeCedula } from './EmployeeCedula'
import { EmployeeCoordinacionId } from './EmployeeCoordinacionId'
import { EmployeeGerenciaId } from './EmployeeGerenciaId'
import { EmployeeId } from './EmployeeId'
import { EmployeeLastName } from './EmployeeLastName'
import { EmployeeName } from './EmployeeName'
import { EmployeeUserName } from './EmployeeUsername'
import { EmployeeVicepresidenciaId } from './EmployeeVicepresidenciaId'
import { Extension } from './Extension'
import { PhoneNumber } from './PhoneNumber'

export interface EmployeePrimitives {
  id: Primitives<EmployeeId>
  userName: Primitives<EmployeeUserName>
  name: Primitives<EmployeeName>
  lastName: Primitives<EmployeeLastName>
  cedula: Primitives<EmployeeCedula>
  locationId: Primitives<LocationId>
  email: Primitives<UserEmail>
  cargoId: Primitives<CargoId>
  extension: Primitives<Extension>
  phoneNumber: Primitives<PhoneNumber>
  vicepresidenciaEjecutivaId: Primitives<VicepresidenciaEjecutivaId>
  vicepresidenciaId: Primitives<EmployeeVicepresidenciaId>
  gerenciaId: Primitives<EmployeeGerenciaId>
  coordinacionId: Primitives<EmployeeCoordinacionId>
}

export class Employee {
  constructor (
    private readonly id: EmployeeId,
    private userName: EmployeeUserName,
    private name: EmployeeName,
    private lastName: EmployeeLastName,
    private cedula: EmployeeCedula,
    private locationId: LocationId,
    private email: UserEmail,
    private cargoId: CargoId,
    private extension: Extension,
    private phoneNumber: PhoneNumber,
    private vicepresidenciaEjecutivaId: VicepresidenciaEjecutivaId,
    private vicepresidenciaId: EmployeeVicepresidenciaId,
    private gerenciaId: EmployeeGerenciaId,
    private coordinacionId: EmployeeCoordinacionId

  ) {}

  static create (params: Omit<EmployeePrimitives, 'id'>): Employee {
    const id = EmployeeId.random().value
    return new Employee(
      new EmployeeId(id),
      new EmployeeUserName(params.userName),
      new EmployeeName(params.name),
      new EmployeeLastName(params.lastName),
      new EmployeeCedula(params.cedula),
      new LocationId(params.locationId),
      new UserEmail(params.email),
      new CargoId(params.cargoId),
      new Extension(params.extension),
      new PhoneNumber(params.phoneNumber),
      new VicepresidenciaEjecutivaId(params.vicepresidenciaEjecutivaId),
      new EmployeeVicepresidenciaId(params.vicepresidenciaId, params.cargoId),
      new EmployeeGerenciaId(params.gerenciaId, params.cargoId),
      new EmployeeCoordinacionId(params.coordinacionId, params.cargoId)
    )
  }

  updateUserName (newName: Primitives<EmployeeUserName>): void {
    this.userName = new EmployeeUserName(newName)
  }

  updateName (newName: Primitives<EmployeeName>): void {
    this.name = new EmployeeName(newName)
  }

  updateLastName (newLastName: Primitives<EmployeeLastName>): void {
    this.lastName = new EmployeeLastName(newLastName)
  }

  updateCedula (newCedula: Primitives<EmployeeCedula>): void {
    this.cedula = new EmployeeCedula(newCedula)
  }

  updateLocation (newLocation: Primitives<LocationId>): void {
    this.locationId = new LocationId(newLocation)
  }

  updateEmail (newEmail: Primitives<UserEmail>): void {
    this.email = new UserEmail(newEmail)
  }

  updateCargo (newCargo: Primitives<CargoId>): void {
    this.cargoId = new CargoId(newCargo)
  }

  updateExtension (newExtension: Primitives<Extension>): void {
    this.extension = new Extension(newExtension)
  }

  updatePhoneNumber (newPhoneNumber: Primitives<PhoneNumber>): void {
    this.phoneNumber = new PhoneNumber(newPhoneNumber)
  }

  updatevicepresidenciaEjecutiva (newVicepresidenciaEjecutivaId: Primitives<VicepresidenciaEjecutivaId>): void {
    this.vicepresidenciaEjecutivaId = new VicepresidenciaEjecutivaId(newVicepresidenciaEjecutivaId)
  }

  updatevicepresidencia (newVicepresidenciaId: Primitives<EmployeeVicepresidenciaId>, cargoId: Primitives<CargoId>): void {
    this.vicepresidenciaId = new EmployeeVicepresidenciaId(newVicepresidenciaId, cargoId)
  }

  updategerencia (newGerenciaId: Primitives<EmployeeGerenciaId>, cargoId: Primitives<CargoId>): void {
    this.gerenciaId = new EmployeeGerenciaId(newGerenciaId, cargoId)
  }

  updatecoordinacion (newCoordinacionId: Primitives<EmployeeCoordinacionId>, cargoId: Primitives<CargoId>): void {
    this.coordinacionId = new EmployeeCoordinacionId(newCoordinacionId, cargoId)
  }

  static fromPrimitives (primitives: EmployeePrimitives): Employee {
    return new Employee(
      new EmployeeId(primitives.id),
      new EmployeeUserName(primitives.userName),
      new EmployeeName(primitives.name),
      new EmployeeLastName(primitives.lastName),
      new EmployeeCedula(primitives.cedula),
      new LocationId(primitives.locationId),
      new UserEmail(primitives.email),
      new CargoId(primitives.cargoId),
      new Extension(primitives.extension),
      new PhoneNumber(primitives.phoneNumber),
      new VicepresidenciaEjecutivaId(primitives.vicepresidenciaEjecutivaId),
      new EmployeeVicepresidenciaId(primitives.vicepresidenciaId, primitives.cargoId),
      new EmployeeGerenciaId(primitives.gerenciaId, primitives.cargoId),
      new EmployeeCoordinacionId(primitives.coordinacionId, primitives.cargoId)
    )
  }

  toPrimitive (): EmployeePrimitives {
    return {
      id: this.idValue,
      userName: this.userNameValue,
      name: this.nameValue,
      lastName: this.lastNameValue,
      cedula: this.cedulaValue,
      locationId: this.locationValue,
      email: this.emailValue,
      cargoId: this.cargoValue,
      extension: this.extensionValue,
      phoneNumber: this.phoneNumberValue,
      vicepresidenciaEjecutivaId: this.vicepresidenciaEjecutivaValue,
      vicepresidenciaId: this.vicepresidenciaValue,
      gerenciaId: this.gerenciaValue,
      coordinacionId: this.coordinacionValue
    }
  }

  get idValue (): Primitives<EmployeeId> {
    return this.id.value
  }

  get userNameValue (): Primitives<EmployeeUserName> {
    return this.userName.value
  }

  get nameValue (): Primitives<EmployeeName> {
    return this.name.value
  }

  get lastNameValue (): Primitives<EmployeeLastName> {
    return this.lastName.value
  }

  get cedulaValue (): Primitives<EmployeeCedula> {
    return this.cedula.value
  }

  get locationValue (): Primitives<LocationId> {
    return this.locationId.value
  }

  get emailValue (): Primitives<UserEmail> {
    return this.email.value
  }

  get cargoValue (): Primitives<CargoId> {
    return this.cargoId.value
  }

  get extensionValue (): Primitives<Extension> {
    return this.extension.value
  }

  get phoneNumberValue (): Primitives<PhoneNumber> {
    return this.phoneNumber.value
  }

  get vicepresidenciaEjecutivaValue (): Primitives<VicepresidenciaEjecutivaId> {
    return this.vicepresidenciaEjecutivaId.value
  }

  get vicepresidenciaValue (): Primitives<EmployeeVicepresidenciaId> {
    return this.vicepresidenciaId.value
  }

  get gerenciaValue (): Primitives<EmployeeGerenciaId> {
    return this.gerenciaId.value
  }

  get coordinacionValue (): Primitives<EmployeeCoordinacionId> {
    return this.coordinacionId.value
  }
}
