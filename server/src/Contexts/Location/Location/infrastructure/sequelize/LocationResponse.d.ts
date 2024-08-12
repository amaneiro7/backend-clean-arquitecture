import { CityPrimitives } from "../../../City/domain/City";
import { SitePrimitives } from "../../../Site/domain/Site";
import { LocationPrimitives } from "../../domain/Location";

export interface LocationApiResponse extends LocationPrimitives {
    site: SiteApiResponse | null
}

interface SiteApiResponse extends SitePrimitives {
    city: CityApiResponse | null
}

interface CityApiResponse extends CityPrimitives {

}