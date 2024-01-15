import { type Repository } from '../../../Contexts/Shared/domain/Repository'
import { Server } from './server'

export class InventarioBackendApp {
  private readonly repository: Repository
  server?: Server
  constructor ({ repository }: { repository: Repository }) {
    this.repository = repository
  }

  async start (): Promise<void> {
    const port = process.env.PORT ?? '5000'
    this.server = new Server({ port, repository: this.repository })

    await this.server.listen()
  }

  get httpServer (): Server['httpServer'] | undefined {
    return this.server?.getHTTPServer()
  }

  async stop (): Promise<void> {
    return await this.server?.stop()
  }
}
