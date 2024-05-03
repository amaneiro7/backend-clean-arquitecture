import { SelectChangeEvent } from "@mui/material"
import { FilterOperator } from "../Select/FilterOperator"
import { FilterField } from "../Select/FilterField"
import { FormInput } from "../text-inputs/FormInput"

export function Filter({
  onFieldSelected,
  onOperatorSelected,
  onValueChanged
}: {
  onFieldSelected: (event: SelectChangeEvent<string | number>, child: React.ReactNode) => void
  onOperatorSelected: (event: SelectChangeEvent<string | number>, child: React.ReactNode) => void
  onValueChanged: (event: React.ChangeEvent<HTMLInputElement>) => void
}) {
  const list = [
    { id: 'serial', name: 'Serial' },
    { id: 'category', name: 'Categoria' },
    { id: 'brand', name: 'Marca' },
    { id: 'model', name: 'Modelo' },
    { id: 'employee', name: 'Usuario' },
    { id: 'activo', name: 'Activo' },
    { id: 'observation', name: 'Observation' },
    { id: 'computerName', name: 'Nombre de Equipo' },
    { id: 'processor', name: 'Procesador' },
    { id: 'memoryRamCapaci', name: 'Memoria Ram' },
    { id: 'hardDriveCapacity', name: 'Capacidad de Disco' },
    { id: 'hardDriveType', name: 'Tipo de Disco' },
    { id: 'operatingSystem', name: 'Sistema Operativo' },
    { id: 'operatingSystemArq', name: 'Arquitectura' },
    { id: 'ipAddress', name: 'Dirección IP' },

  ]
  return (
    <div className="flex flex-row gap-2">
      <div className="inline-block relative w-64 mr-3">
        <FilterField onChange={onFieldSelected} options={list} />
      </div>
      <div className="inline-block relative w-64 mr-3">
        <FilterOperator onChange={onOperatorSelected} />
      </div>
      <div className="inline-block relative w-64 mr-3">
        <FormInput
          id="Valor"
          label="Valor"
          placeholder="Lo que sea..."
          type="text"
          name="value"
          handle={onValueChanged}
        />
      </div>
    </div>
  )
}
