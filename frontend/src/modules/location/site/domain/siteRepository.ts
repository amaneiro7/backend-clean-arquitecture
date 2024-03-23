import { type SitePrimitives } from './site'

export abstract class SiteRepository {
  abstract getAll (): Promise<SitePrimitives[]>
}
