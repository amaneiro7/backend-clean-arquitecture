import { Filter } from './Filter'

export class Filters {
  public readonly filters: Filter[]

  constructor (filters: Filter[]) {
    this.filters = filters
  }

  // Esto es simplemente otra forma de instanciar nuestra clase
  // La usamos cuando queremos hacer logica extra en nuestra instanciación
  public static fromValues (filters: Array<Map<string, string>>): Filters {
    return new Filters(filters.map(Filter.fromValues))
  }

  public static none (): Filters {
    return new Filters([])
  }
}
