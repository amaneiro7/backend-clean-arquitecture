import { type Primitives } from '../../../Shared/domain/value-object/Primitives'
import { MemoryRamCapacity } from '../../MemoryRam/MemoryRamCapacity/MemoryRamCapacity'
import { type DeviceComputer } from './Computer'

export class ComputerMemoryRamCapacity extends MemoryRamCapacity {
  static async updateMemoryRamField ({ memoryRam, entity }: { memoryRam?: Primitives<ComputerMemoryRamCapacity>, entity: DeviceComputer }): Promise<void> {
    // Si no se ha pasado un nuevo valor de la memoria Ram no realiza ninguna acción
    if (memoryRam === undefined) {
      return
    }
    // Verifica que si el valor del campo la memoria Ram actual y el nuevo valor la memoria Ram son iguales no realiza un cambio
    if (entity.memoryRamCapacityValue === memoryRam) {
      return
    }
    // Actualiza el campo la memoria Ram de la entidad {@link Device} con el nuevo la memoria Ram
    entity.updateMemoryRam(memoryRam)
  }
}
