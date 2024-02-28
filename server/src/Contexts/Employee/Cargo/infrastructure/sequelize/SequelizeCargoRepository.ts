import { type Primitives } from '../../../../Shared/domain/value-object/Primitives'
import { type CargoPrimitives } from '../../domain/Cargo'
import { type CargoId } from '../../domain/CargoId'
import { type CargoRepository } from '../../domain/CargoRepository'
import { CargoModel } from './CargoSchema'

export class SequelizeCargoRepository implements CargoRepository {
  async searchAll (): Promise<CargoPrimitives[]> {
    return await CargoModel.findAll()
  }

  async searchById (id: Primitives<CargoId>): Promise<CargoPrimitives | null> {
    return await CargoModel.findByPk(id) ?? null
  }
}
