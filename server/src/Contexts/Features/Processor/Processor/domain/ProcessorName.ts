import { type Primitives } from '../../../../Shared/domain/value-object/Primitives'
import { type ProcessorFrequency } from './ProcessorFrequency'
import { type ProcessorNumberModel } from './ProcessorNumberModel'
import { type ProcessorProductCollection } from './ProcessorProductCollection'

export class ProcessorName {
  readonly value: string
  constructor (
    readonly productCollection: Primitives<ProcessorProductCollection>,
    readonly numberModel: Primitives<ProcessorNumberModel>,
    readonly frequency: Primitives<ProcessorFrequency>
  ) {
    this.value = `${productCollection} ${numberModel} CPU @ ${frequency}GHz`
  }

  toPrimitives (): string {
    return this.value
  }
}
