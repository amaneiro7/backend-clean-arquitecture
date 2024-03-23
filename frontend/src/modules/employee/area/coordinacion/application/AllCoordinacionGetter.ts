import { type Repository } from '../../../../shared/domain/repository'
import { type CoordinacionPrimitives } from '../domain/Coordinacion'

export class AllCoordinacionGetter {
  constructor (private readonly repository: Repository) {}

  async get (): Promise<CoordinacionPrimitives[]> {
    return await this.repository.coordinacion.getAll()
  }
}
