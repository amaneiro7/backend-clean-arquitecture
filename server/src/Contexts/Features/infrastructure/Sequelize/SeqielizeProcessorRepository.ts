import { type ComputerProcessorPrimitives } from '../../domain/Processor/ComputerProcessor'
import { type ComputerProcessorRepository } from '../../domain/Processor/ComputerProcessorRepository'
import { ProcessorModel } from './ProcessorSchema'

export class SequelizeProcessorRepository implements ComputerProcessorRepository {
  async searchAll (): Promise<ComputerProcessorPrimitives[]> {
    return await ProcessorModel.findAll()
  }

  async searchById (id: string): Promise<ComputerProcessorPrimitives | null> {
    return await ProcessorModel.findByPk(id) ?? null
  }

  async searchByName (name: string): Promise<ComputerProcessorPrimitives | null> {
    return await ProcessorModel.findOne({ where: { name } }) ?? null
  }

  async save (payload: ComputerProcessorPrimitives): Promise<void> {
    const { id, name } = payload
    const [processor, created] = await ProcessorModel.findOrCreate({
      where: { id },
      defaults: { id, name }
    })
    console.log(processor.toJSON())
    console.log(created)
  }

  async remove (id: string): Promise<void> {
    await ProcessorModel.destroy({ where: { id } })
  }
}
