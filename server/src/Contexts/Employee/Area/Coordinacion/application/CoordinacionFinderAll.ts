import { type Repository } from '../../../../Shared/domain/Repository'
import { type CoordinacionPrimitives } from '../domain/Coordinacion'

export class SearchAllCoordinacion {
  constructor (private readonly repository: Repository) {}

  async search (): Promise<CoordinacionPrimitives[]> {
    return await this.repository.coordinacion.searchAll()
  }
}
