import { SitePrimitives } from "../../../Site/domain/Site";
import { LocationPrimitives } from "../../domain/Location";

export interface LocationApiResponse extends LocationPrimitives {
    site: SitePrimitives | null
}