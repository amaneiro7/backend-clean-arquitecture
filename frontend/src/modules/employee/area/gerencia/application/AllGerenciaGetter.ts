import { type Repository } from '../../../../shared/domain/repository'
import { type GerenciaPrimitives } from '../domain/gerencia'

export class AllGerenciaGetter {
  constructor (private readonly repository: Repository) {}

  async get (): Promise<GerenciaPrimitives[]> {
    return await this.repository.gerencia.getAll()
  }
}
