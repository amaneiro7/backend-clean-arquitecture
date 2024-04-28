import { type Primitives } from '../../../../shared/domain/value-object/Primitives'
import { ProcessorProductCollection } from './ProcessorCollection'
import { ProcessorCores } from './ProcessorCores'
import { ProcessorFrequency } from './ProcessorFrequency'
import { ProcessorHasThreads } from './ProcessorHasThreads'
import { type ProcessorId } from './ProcessorId'
import { ProcessorName } from './ProcessorName'
import { ProcessorNumberModel } from './ProcessorNumberModel'

export interface ProcessorPrimitives {
  id?: Primitives<ProcessorId>
  name?: Primitives<ProcessorName>
  productCollection: Primitives<ProcessorProductCollection>
  numberModel: Primitives<ProcessorNumberModel>
  cores: Primitives<ProcessorCores>
  threads: Primitives<ProcessorHasThreads>
  frequency: Primitives<ProcessorFrequency>
}

export class Processor {
  constructor (
    private productCollection: ProcessorProductCollection,
    private numberModel: ProcessorNumberModel,
    private cores: ProcessorCores,
    private threads: ProcessorHasThreads,
    private frequency: ProcessorFrequency
  ) {}

  public static create (params: Omit<ProcessorPrimitives, 'id' | 'name'>): Processor {
    return new Processor(
      new ProcessorProductCollection(params.productCollection),
      new ProcessorNumberModel(params.numberModel),
      new ProcessorCores(params.cores),
      new ProcessorHasThreads(params.threads),
      new ProcessorFrequency(params.frequency)
    )
  }

  productCollectionValue (): Primitives<ProcessorProductCollection> {
    return this.productCollection.value
  }
  numberModelValue (): Primitives<ProcessorNumberModel> {
    return this.numberModel.value
  }
  coresValue (): Primitives<ProcessorCores> {
    return this.cores.value
  }
  hasThreadsValue (): Primitives<ProcessorHasThreads> {
    return this.threads.value
  }
  frequencyValue (): Primitives<ProcessorFrequency> {
    return this.frequency.value
  }

  toPrimitives (): ProcessorPrimitives {
   return {
        productCollection: this.productCollectionValue(),
        numberModel: this.numberModelValue(),
        cores: this.coresValue(),
        threads: this.hasThreadsValue(),
        frequency: this.frequencyValue(),
    }
  }
}
