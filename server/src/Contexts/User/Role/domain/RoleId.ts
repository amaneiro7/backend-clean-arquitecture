import { NumberValueObject } from '../../../Shared/domain/value-object/NumberValueObject';
import { Primitives } from '../../../Shared/domain/value-object/Primitives';

export class RoleId extends NumberValueObject {
    static readonly Options: Record<string, number> = {
        ADMIN: 1,
        SPECIALIST: 2,
        COORD: 3,
        GERENTE: 4
    } as const

}
