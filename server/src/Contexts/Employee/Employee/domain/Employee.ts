import { LocationId } from '../../../Location/Location/domain/LocationId'
import { type Primitives } from '../../../Shared/domain/value-object/Primitives'
import { UserEmail } from '../../../User/user/domain/UserEmail'
import { CargoId } from '../../Cargo/domain/CargoId'
import { EmployeeCedula } from './EmployeeCedula'
import { EmployeeId } from './EmployeeId'
import { EmployeeLastName } from './EmployeeLastName'
import { EmployeeName } from './EmployeeName'
import { Extension } from './Extension'
import { PhoneNumber } from './PhoneNumber'

export interface EmployeePrimitives {
  id: Primitives<EmployeeId>
  name: Primitives<EmployeeName>
  lastName: Primitives<EmployeeLastName>
  cedula: Primitives<EmployeeCedula>
  locationId: Primitives<LocationId>
  email: Primitives<UserEmail>
  cargoId: Primitives<CargoId>
  extension: Primitives<Extension>
  phoneNumber: Primitives<PhoneNumber>
}

export class Employee {
  constructor (
    private readonly id: EmployeeId,
    private name: EmployeeName,
    private lastName: EmployeeLastName,
    private cedula: EmployeeCedula,
    private locationId: LocationId,
    private email: UserEmail,
    private cargoId: CargoId,
    private extension: Extension,
    private phoneNumber: PhoneNumber
  ) {}

  static create ({
    name,
    lastName,
    cedula,
    locationId,
    email,
    cargoId,
    extension,
    phoneNumber
  }: Omit<EmployeePrimitives, 'id'>): Employee {
    const id = EmployeeId.random().value
    return new Employee(
      new EmployeeId(id),
      new EmployeeName(name),
      new EmployeeLastName(lastName),
      new EmployeeCedula(cedula),
      new LocationId(locationId),
      new UserEmail(email),
      new CargoId(cargoId),
      new Extension(extension),
      new PhoneNumber(phoneNumber)
    )
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

  static fromPrimitives (primitives: EmployeePrimitives): Employee {
    return new Employee(
      new EmployeeId(primitives.id),
      new EmployeeName(primitives.name),
      new EmployeeLastName(primitives.lastName),
      new EmployeeCedula(primitives.cedula),
      new LocationId(primitives.locationId),
      new UserEmail(primitives.email),
      new CargoId(primitives.cargoId),
      new Extension(primitives.extension),
      new PhoneNumber(primitives.phoneNumber)
    )
  }

  toPrimitive (): EmployeePrimitives {
    return {
      id: this.idValue,
      name: this.nameValue,
      lastName: this.lastNameValue,
      cedula: this.cedulaValue,
      locationId: this.locationValue,
      email: this.emailValue,
      cargoId: this.cargoValue,
      extension: this.extensionValue,
      phoneNumber: this.phoneNumberValue
    }
  }

  get idValue (): Primitives<EmployeeId> {
    return this.id.value
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
}
