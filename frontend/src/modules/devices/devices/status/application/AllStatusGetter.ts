import { type Repository } from '../../../../shared/domain/repository'
import { type Status } from '../domain/Status'

export async function allStatusGetter ({ repository }: { repository: Repository }): Promise<Status[]> {
  return await repository.status.getAll()
}
