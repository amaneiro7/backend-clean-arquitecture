import { API_URL } from '../../../../shared/infraestructure/config'
import { errorApiMessage } from '../../../../shared/infraestructure/errorMessage'
import { type ComputerPrimitives } from '../domain/Computer'
import { type ComputerRepository } from '../domain/ComputerRepository'

export class ApiComputerRepository implements ComputerRepository {
  async getAll (): Promise<ComputerPrimitives[]> {
    return await fetch(`${API_URL}/computers`)
      .then(async res => {
        if (!res.ok) {
          throw new Error(await res.text())
        } return await (res.json() as Promise<ComputerPrimitives[]>)
      })
      .catch(() => {
        throw new Error(errorApiMessage)
      })
  }
}
