import { type InputTypePrimitives } from './InputType'

export abstract class InputTypeRepository {
  abstract searchAll (): Promise<InputTypePrimitives[]>

  abstract searchById (id: number): Promise<InputTypePrimitives | null>
}
