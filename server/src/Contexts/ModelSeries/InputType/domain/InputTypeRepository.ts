import { Primitives } from '../../../Shared/domain/value-object/Primitives';
import { type InputTypePrimitives } from './InputType'
import { InputTypeId } from './InputTypeId';

export abstract class InputTypeRepository {
  abstract searchAll (): Promise<InputTypePrimitives[]>

  abstract searchById (id: Primitives<InputTypeId>): Promise<InputTypePrimitives | null>
}
