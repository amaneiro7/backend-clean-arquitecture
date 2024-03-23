import { type LocationPrimitives } from './location'

export abstract class LocationRepository {
  abstract getAll (): Promise<LocationPrimitives[]>
}
