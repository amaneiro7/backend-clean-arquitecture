import { type Repository } from '../../../../Shared/domain/Repository'
import { type GerenciaPrimitives } from '../domain/Gerencia'

export class SearchAllGerencia {
  constructor (private readonly repository: Repository) {}

  async search (): Promise<GerenciaPrimitives[]> {
    return await this.repository.gerencia.searchAll()
  }
}
