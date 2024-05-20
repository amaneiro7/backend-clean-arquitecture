import { type Primitives } from "../../../shared/domain/value-object/Primitives"
import { type CityId } from "../../city/domain/CityId"
import { type SiteId } from "./SiteId"

export interface SitePrimitives {
  id: Primitives<SiteId>
  name: string
  cityId: Primitives<CityId>
  address: string
}
