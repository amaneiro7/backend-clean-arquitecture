import { type ComputerFeaturesId } from './ComputerId'
import { type Computer } from './Computer'

export abstract class ComputerRepository {
  abstract save (payload: ComputerFeatures): Promise<void>

  abstract searchById: (id: ComputerFeaturesId) => Promise<ComputerFeatures | null>
}
