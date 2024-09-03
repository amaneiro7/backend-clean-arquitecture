import { CityId } from "@/modules/location/city/domain/CityId"
import { SiteAddress } from "@/modules/location/site/domain/SiteAddress"
import { SiteId } from "@/modules/location/site/domain/SiteId"
import { SiteName } from "@/modules/location/site/domain/SiteName"
import { type Primitives } from "@/modules/shared/domain/value-object/Primitives"

export interface DefaultSiteProps {
    id?: Primitives<SiteId>
    name: Primitives<SiteName>
    address: Primitives<SiteAddress>
    cityId: Primitives<CityId>
    updatedAt?: string
}

export interface FormSiteErrors {
    name: string
    address: string
    cityId: string
}

export interface FormSiteDisabled {
    name: boolean
    address: boolean
    cityId: boolean
}
export interface FormSiteRequired {
    name: boolean
    address: boolean
    cityId: boolean
}