import { type Primitives } from '../../../../../Shared/domain/value-object/Primitives'
import { type ProcessorPrimitives } from '../../domain/Processor'
import { type ProcessorNumberModel } from '../../domain/ProcessorNumberModel'
import { type ProcessorRepository } from '../../domain/ProcessorRepository'
import { ProcessorModel } from './ProcessorSchema'

export class SequelizeProcessorRepository implements ProcessorRepository {
  async searchAll (): Promise<ProcessorPrimitives[]> {
    return await ProcessorModel.findAll()
  }

  async searchById (id: string): Promise<ProcessorPrimitives | null> {
    return await ProcessorModel.findByPk(id) ?? null
  }

  async searchByNumberModel (numberModel: Primitives<ProcessorNumberModel>): Promise<ProcessorPrimitives | null> {
    return await ProcessorModel.findOne({ where: { numberModel } }) ?? null
  }

  async save (payload: ProcessorPrimitives): Promise<void> {
    const { id } = payload
    const processor = await ProcessorModel.findByPk(id) ?? null
    if (processor === null) {
      await ProcessorModel.create({ ...payload })
    } else {
      processor.set({ ...payload })
      await processor.save()
    }
  }

  async remove (id: string): Promise<void> {
    await ProcessorModel.destroy({ where: { id } })
  }
}
