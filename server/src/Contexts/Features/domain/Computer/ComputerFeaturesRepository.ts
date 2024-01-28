import { type ComputerFeaturesId } from './ComputerFeatureId'
import { type ComputerFeatures } from './ComputerFeatures'

export abstract class ComputerFeaturesRepository {
  abstract save (payload: ComputerFeatures): Promise<void>

  abstract searchById: (id: ComputerFeaturesId) => Promise<ComputerFeatures | null>
}
