import { type OperatingSystemArqPrimitives } from './OperatingSystemArq'

export abstract class OperatingSystemArqRepository {
  abstract searchAll (): Promise<OperatingSystemArqPrimitives[]>

  abstract searchById (id: number): Promise<OperatingSystemArqPrimitives | null>
}
