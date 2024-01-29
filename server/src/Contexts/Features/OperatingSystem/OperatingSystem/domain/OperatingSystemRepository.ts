import { type OperatingSystemPrimitives } from './OperatingSystem'

export abstract class OperatingSystemRepository {
  abstract searchAll (): Promise<OperatingSystemPrimitives[]>

  abstract searchById (id: number): Promise<OperatingSystemPrimitives | null>
}
