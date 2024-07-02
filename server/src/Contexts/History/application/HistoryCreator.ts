import { Repository } from "../../Shared/domain/Repository"
import { History, HistoryPrimitives } from "../domain/History"

export interface HistoryParams extends Omit<HistoryPrimitives, 'id'> { }

export class HistoryCreator {
    constructor(private readonly repository: Repository) { }

    async run(params: HistoryParams): Promise<void> {

        const history = History.create(params)

        await this.repository.history.save(history.toPrimitives())
    }
}
