import { type Primitives } from '../../../../Shared/domain/value-object/Primitives'
import { HardDriveTypeId } from '../../HardDriveType/domain/HardDriveTypeId'
import { type HardDriveTypeRepository } from '../../HardDriveType/domain/HardDriveTypeRepository'
import { type DeviceHardDrive } from './HardDrive'

export class HDDType extends HardDriveTypeId {
  static async updateHardDriveTypeField ({ repository, hardDriveType, entity }: { repository: HardDriveTypeRepository, hardDriveType?: Primitives<HDDType>, entity: DeviceHardDrive }): Promise<void> {
    // Si no se ha pasado un nuevo valor de la capacidad del Disco Duro no realiza ninguna acción
    if (hardDriveType === undefined) {
      return
    }
    // Verifica que si el valor actual y el nuevo valor son iguales no realice ningún cambio
    if (entity.employeeeValue === hardDriveType) {
      return
    }
    // Verifica que el valor de la capacidad del Disco Duro exista en la base de datos, si no existe lanza un error {@link EmployeeDoesNotExistError} con el valor de la capacidad del Disco Duro pasado
    await HardDriveTypeId.ensureHardDriveTypeExit({ repository, hardDriveType })
    // Actualiza el campo valor de la capacidad del Disco Duro de la entidad {@link Device} con el nuevo valor de la capacidad del Disco Duro
    entity.updateHardDriveType(hardDriveType)
  }
}
