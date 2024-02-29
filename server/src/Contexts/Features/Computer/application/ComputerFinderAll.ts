import { type Repository } from '../../../Shared/domain/Repository'
import { type ComputerPrimitives } from '../domain/Computer.old'

export class SearchAllComputer {
  constructor (private readonly repository: Repository) {}

  async search (): Promise<ComputerPrimitives[]> {
    return await this.repository.computer.searchAll()
  }
}
