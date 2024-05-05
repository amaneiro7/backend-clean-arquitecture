import { Criteria } from '../../../shared/domain/criteria/Criteria';
import { type LocationPrimitives } from './location'

export abstract class LocationRepository {
  abstract getAll (): Promise<LocationPrimitives[]>
  
  abstract getByCriteria (criteria: Criteria): Promise<LocationPrimitives[]>
}
