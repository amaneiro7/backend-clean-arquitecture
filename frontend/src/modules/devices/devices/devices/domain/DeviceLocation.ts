import { LocationId } from "../../../../location/locations/domain/locationId";
import { TypeOfSiteId } from "../../../../location/typeofsites/domain/typeOfSiteId";
import { Primitives } from "../../../../shared/domain/value-object/Primitives";
import { StatusId } from "../../status/domain/StatusId";

export class DeviceLocation extends LocationId {
    private static errors: string = ''
    constructor(
        locationId: Primitives<LocationId>,
        private readonly status: Primitives<StatusId>,
        private readonly typeOfSite: Primitives<TypeOfSiteId>,
    ) {
        super(locationId)
        if (!DeviceLocation.isValid({status: this.status, typeOfSite: this.typeOfSite})){
            throw new Error(DeviceLocation.invalidMessage())
        }
    }


    private static updateError(error: string): void {
        DeviceLocation.errors = error
    }

    private static get errorsValue(): string {
        return DeviceLocation.errors
    }

    public static isValid({status, typeOfSite}:{typeOfSite: Primitives<TypeOfSiteId>, status: Primitives<StatusId>}): boolean {
        if (status === StatusId.StatusOptions.INUSE && typeOfSite === TypeOfSiteId.SitesOptions.ALMACEN) {
            this.updateError('Si esta en uso, la ubicación no puede estar en almacen')
            return false
        }
        if (status !== StatusId.StatusOptions.INUSE && typeOfSite !== TypeOfSiteId.SitesOptions.ALMACEN) {
            this.updateError('Si no esta en uso, solo puede estar ubicado en el almacen')
            return false
        }
        return true
    }

    public static invalidMessage(): string {
        return this.errorsValue
    }
}