// Servicio para consultar nombres de tablas o entidades existentes
class TableService {
  getExistingTables (): string[] {
    // Aquí realizas la lógica para consultar la base de datos y obtener la lista de nombres de tablas o entidades existentes
    // Esta lógica dependerá de la infraestructura de tu aplicación y la tecnología de base de datos que estés utilizando
    // Por ejemplo, si estás utilizando un ORM, podrías consultar el esquema de la base de datos para obtener los nombres de tablas existentes
    // Si estás utilizando un enfoque más directo con la base de datos, podrías ejecutar consultas SQL específicas para obtener esta información
    return ['existing_table1', 'existing_table2'] // Ejemplo: Devolver una lista de nombres de tablas existentes
  }
}

// Value Object para table_name
export class TableName {
  constructor (
    private readonly value: string,
    private readonly tableService: TableService
  ) {
    // Aquí puedes agregar validaciones dinámicas basadas en la lista de nombres de tablas o entidades existentes
    if (!this.isValidTableName(value)) {
      throw new Error('Table name is not valid')
    }
  }

  isValidTableName (value: string): boolean {
    const existingTables = this.tableService.getExistingTables()
    return existingTables.includes(value)
  }

  getValue (): string {
    return this.value
  }
}

// Ejemplo de uso
// const tableService = new TableService()
// const tableName = new TableName('existing_table1', tableService) // Ejemplo de validación exitosa
