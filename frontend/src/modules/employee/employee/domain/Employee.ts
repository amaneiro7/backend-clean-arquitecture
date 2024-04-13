import { DeviceId } from "../../../devices/devices/devices/domain/DeviceId";
import { LocationId } from "../../../location/locations/domain/locationId";
import { Primitives } from "../../../shared/domain/value-object/Primitives";
import { UserName } from "../../../user/user/domain/UserName";
import { EmployeeEmail } from "./EmployeeEmail";
import { EmployeeId } from "./EmployeeId";
import { EmployeeLastName } from "./LastName";
import { EmployeeName } from "./Name";
import { EmployeeUserName } from "./UserName";

export interface EmployeePrimitives {
    id?: Primitives<EmployeeId>
    name: Primitives<EmployeeName>
    lastName: Primitives<EmployeeLastName>
    userName: Primitives<EmployeeUserName>
    cedula: Primitives<>
    locationId: Primitives<LocationId>
    email: Primitives<EmployeeEmail>
    cargoId: Primitives<>
    extension: Primitives<>
    phoneNumber: Primitives<>
    vicepresidenciaEjecutivaId: Primitives<>
    vicepresidenciaId: Primitives<>
    gerenciaId: Primitives<>
    coordinacionId: Primitives<>
    devices: Primitives<DeviceId>[]

}

export class Employee {
    constructor (
        private readonly name: EmployeeName,
        private readonly lastName: EmployeeName,
        private readonly userName: UserName,
        private readonly cedula,
        private readonly locationId: LocationId,
        private readonly email: EmployeeEmail,
        private readonly cargoId: CargoId,
        private readonly extension,
        private readonly phoneNumber,
        private readonly vicepresidenciaEjecutivaId,
        private readonly vicepresidenciaId,
        private readonly gerenciaId,
        private readonly coordinacionId,
        private readonly devices: DeviceId[]
    )
}