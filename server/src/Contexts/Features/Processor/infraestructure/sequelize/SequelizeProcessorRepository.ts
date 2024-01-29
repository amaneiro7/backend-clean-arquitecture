import { type ProcessorPrimitives } from '../../domain/Processor'
import { type ProcessorRepository } from '../../domain/ProcessorRepository'
import { ProcessorModel } from './ProcessorSchema'

export class SequelizeProcessorRepository implements ProcessorRepository {
  async searchAll (): Promise<ProcessorPrimitives[]> {
    return await ProcessorModel.findAll()
  }

  async searchById (id: string): Promise<ProcessorPrimitives | null> {
    return await ProcessorModel.findByPk(id) ?? null
  }

  async searchByName (name: string): Promise<ProcessorPrimitives | null> {
    return await ProcessorModel.findOne({ where: { name } }) ?? null
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
