import { Primitives } from "../../../shared/domain/value-object/Primitives"
import { SiteId } from "./SiteId"

export interface SitePrimitives {
  id: Primitives<SiteId>
  name: string
  cityId: number
  address: string
}
