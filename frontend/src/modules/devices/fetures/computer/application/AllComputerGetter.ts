import { type Repository } from '../../../../shared/domain/repository'
import { type ComputerPrimitives } from '../domain/Computer'

export class AllComputerGetter {
  constructor (private readonly repository: Repository) {}
  async get (): Promise<ComputerPrimitives[]> {
    return await this.repository.computer.getAll()
  }
}
