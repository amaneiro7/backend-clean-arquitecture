export abstract class TableService {
  abstract getExistingTables (): Promise<string[]>
}
