import { type ComputerPrimitives } from './Computer.old'

export abstract class ComputerRepository {
  abstract save (payload: ComputerPrimitives): Promise<void>

  abstract searchAll (): Promise<ComputerPrimitives[]>

  abstract searchById (id: string): Promise<ComputerPrimitives | null>

  abstract searchByDeviceId (deviceId: string): Promise<ComputerPrimitives | null>
}
