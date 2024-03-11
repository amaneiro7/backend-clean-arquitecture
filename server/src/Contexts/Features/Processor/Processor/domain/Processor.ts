import { type Primitives } from '../../../../Shared/domain/value-object/Primitives'
import { ProcessorCores } from './ProcessorCores'
import { ProcessorFrequency } from './ProcessorFrequency'
import { ProcessorId } from './ProcessorId'
import { ProcessorHasThreads } from './ProcessorIsThreads'
import { ProcessorName } from './ProcessorName'
import { ProcessorNumberModel } from './ProcessorNumberModel'
import { ProcessorProductCollection } from './ProcessorProductCollection'

export interface ProcessorPrimitives {
  id: Primitives<ProcessorId>
  productCollection: Primitives<ProcessorProductCollection>
  numberModel: Primitives<ProcessorNumberModel>
  name: Primitives<ProcessorName>
  cores: Primitives<ProcessorCores>
  threads: Primitives<ProcessorHasThreads>
  frequency: Primitives<ProcessorFrequency>
}

export class Processor {
  constructor (
    private readonly id: ProcessorId,
    private productCollection: ProcessorProductCollection,
    private numberModel: ProcessorNumberModel,
    private cores: ProcessorCores,
    private threads: ProcessorHasThreads,
    private frequency: ProcessorFrequency
  ) {}

  static create ({ productCollection, numberModel, cores, threads, frequency }: Omit<ProcessorPrimitives, 'id' | 'name'>): Processor {
    const id = ProcessorId.random().value
    return new Processor(
      new ProcessorId(id),
      new ProcessorProductCollection(productCollection),
      new ProcessorNumberModel(numberModel),
      new ProcessorCores(cores),
      new ProcessorHasThreads(threads),
      new ProcessorFrequency(frequency)
    )
  }

  updateProductCollection (productCollection: Primitives<ProcessorProductCollection>): void {
    this.productCollection = new ProcessorProductCollection(productCollection)
  }

  updateNumberModel (numberModel: Primitives<ProcessorNumberModel>): void {
    this.numberModel = new ProcessorNumberModel(numberModel)
  }

  updateCores (cores: Primitives<ProcessorCores>): void {
    this.cores = new ProcessorCores(cores)
  }

  updateThreads (threads: Primitives<ProcessorHasThreads>): void {
    this.threads = new ProcessorHasThreads(threads)
  }

  updateFrequency (frequency: Primitives<ProcessorFrequency>): void {
    this.frequency = new ProcessorFrequency(frequency)
  }

  static fromPrimitives (primitives: ProcessorPrimitives): Processor {
    return new Processor(
      new ProcessorId(primitives.id),
      new ProcessorProductCollection(primitives.productCollection),
      new ProcessorNumberModel(primitives.numberModel),
      new ProcessorCores(primitives.cores),
      new ProcessorHasThreads(primitives.threads),
      new ProcessorFrequency(primitives.frequency)
    )
  }

  toPrimitive (): ProcessorPrimitives {
    return {
      id: this.id.value,
      productCollection: this.productCollectionValue,
      numberModel: this.numberModelValue,
      cores: this.coresValue,
      threads: this.threadsValue,
      frequency: this.frequencyValue,
      name: this.nameValue
    }
  }

  get idValue (): Primitives<ProcessorId> {
    return this.id.value
  }

  get nameValue (): Primitives<ProcessorName> {
    return new ProcessorName(this.productCollectionValue, this.numberModelValue, this.frequencyValue).toPrimitives()
  }

  get productCollectionValue (): Primitives<ProcessorProductCollection> {
    return this.productCollection.value
  }

  get numberModelValue (): Primitives<ProcessorNumberModel> {
    return this.numberModel.value
  }

  get coresValue (): Primitives<ProcessorCores> {
    return this.cores.value
  }

  get threadsValue (): Primitives<ProcessorHasThreads> {
    return this.threads.value
  }

  get frequencyValue (): Primitives<ProcessorFrequency> {
    return this.frequency.value
  }
}
