import { AcceptedNullValueObject } from '../../../Shared/domain/value-object/AcceptedNullValueObjects'
import { InvalidArgumentError } from '../../../Shared/domain/value-object/InvalidArgumentError'
import { type Primitives } from '../../../Shared/domain/value-object/Primitives'
import { type ProcessorPrimitives } from '../../Processor/Processor/domain/Processor'
import { ProcessorDoesNotExistError } from '../../Processor/Processor/domain/ProcessorDoesNotExistError'
import { ProcessorId } from '../../Processor/Processor/domain/ProcessorId'
import { type ProcessorRepository } from '../../Processor/Processor/domain/ProcessorRepository'
import { type DeviceComputer } from './Computer'

export class ComputerProcessor extends AcceptedNullValueObject<Primitives<ProcessorId>> {
  constructor (
    readonly value: Primitives<ProcessorId> | null
  ) {
    super(value)
    // this.nullIsCargoisHigherThanCoordinador(cargoId)
    this.ensureIsValidProcessorId(value)
  }

  toPrimitives (): Primitives<ProcessorId> | null {
    return this.value
  }

  private ensureIsValidProcessorId (id: Primitives<ProcessorId> | null): void {
    if (!this.isValid(id)) {
      throw new InvalidArgumentError('EmployeeId is required')
    }
  }

  private isValid (id: Primitives<ProcessorId> | null): boolean {
    if (id === null) return true
    const processorId = new ProcessorId(id)
    if (processorId instanceof ProcessorId) {
      return true
    }

    return false
  }

  static async updateProcessorField ({ repository, processor, entity }: { repository: ProcessorRepository, processor?: Primitives<ComputerProcessor>, entity: DeviceComputer }): Promise<void> {
    // Si no se ha pasado un nuevo valor del procesador no realiza ninguna acción
    if (processor === undefined) {
      return
    }
    // Verifica que si el valor actual y el nuevo valor son iguales no realice ningún cambio
    if (entity.employeeeValue === processor) {
      return
    }
    // Verifica que el valor del procesador exista en la base de datos, si no existe lanza un error {@link EmployeeDoesNotExistError} con el valor del procesador pasado
    await ComputerProcessor.ensureProcessorExit({ repository, processor })
    // Actualiza el campo valor del procesador de la entidad {@link Device} con el nuevo valor del procesador
    entity.updateEmployee(processor)
  }

  static async ensureProcessorExit ({ repository, processor }: { repository: ProcessorRepository, processor: Primitives<ComputerProcessor> }): Promise<void> {
    // If the valor del procesador is null, it does not exist, so we don't need to do any verification
    if (processor === null) {
      return
    }
    // Searches for a device with the given valor del procesador in the database
    const deviceWithProcessor: ProcessorPrimitives | null = await repository.searchById(new ProcessorId(processor).toString())
    // If a device with the given valor del procesador exists, it means that it already exists in the database,
    // so we need to throw a {@link DeviceAlreadyExistError} with the given valor del procesador
    if (deviceWithProcessor === null) {
      throw new ProcessorDoesNotExistError(processor)
    }
  }
}
