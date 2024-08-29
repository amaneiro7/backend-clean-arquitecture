import { BooleanValueObject } from '../../../Shared/domain/value-object/BooleanValueObject'
import { InvalidArgumentError } from '../../../Shared/domain/value-object/InvalidArgumentError'
import { ModelSeries } from './ModelSeries'
import { type Primitives } from '../../../Shared/domain/value-object/Primitives'

export class Generic extends BooleanValueObject {
    constructor(readonly value: boolean) {
        super(value)

        this.ensureIsValid(value)
    }

    toPrimitives(): boolean {
        return this.value
    }

    private ensureIsValid(value: boolean): void {
        if (!this.isValid(value)) {
            throw new InvalidArgumentError(`This <${value}> is not a valid type`)
        }
    }

    private isValid(value: boolean): boolean {
        return typeof value === 'boolean'
    }

    static async updateGenericField(params: { generic: Primitives<Generic>, entity: ModelSeries }): Promise<void> {

        if (params.generic === undefined) {
            return
        }

        if (params.entity.genericValue === params.generic) {
            return
        }

        params.entity.updateGeneric(params.generic)
    }
}
