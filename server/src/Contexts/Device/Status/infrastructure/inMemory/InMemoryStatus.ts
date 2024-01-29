import { type StatusPrimitives } from '../../domain/Status'
import { type StatusRepository } from '../../domain/StatusRepository'

const status: StatusPrimitives[] = [
  {
    id: 1,
    name: 'En Uso'
  },
  {
    id: 2,
    name: 'En Almacen'
  },
  {
    id: 3,
    name: ' Por desincorporar'
  },
  {
    id: 4,
    name: 'Desincorporado'
  }
]

export class InMemoryStatusRepository implements StatusRepository {
  async searchAll (): Promise<StatusPrimitives[]> {
    return status
  }
}
