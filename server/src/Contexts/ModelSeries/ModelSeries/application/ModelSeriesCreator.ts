import { type Repository } from '../../../Shared/domain/Repository'
import { ComputerModels, type ComputerModelsPrimitives } from '../../ModelCharacteristics/Computers/Computer/domain/ComputerModels'
import { LaptopsModels, type LaptopsModelsPrimitives } from '../../ModelCharacteristics/Computers/Laptops/domain/LaptopsModels'
import { MonitorModels, type MonitorModelsPrimitives } from '../../ModelCharacteristics/Monitors/domain/MonitorModels'
import { ModelPrinters, type ModelPrintersPrimitives } from '../../ModelCharacteristics/Printers/Printers/domain/ModelPrinters'
import { ModelSeries, type ModelSeriesPrimitives } from '../domain/ModelSeries'
import { ModelSeriesAlreadyExistError } from '../domain/ModelSeriesAlreadyExistError'
import { ModelSeriesName } from '../domain/ModelSeriesName'

// Define the model parameters interface
export interface ModelParams extends Omit<ModelSeriesPrimitives, 'id'> {}

// Create the ModelSeriesCreator class
export class ModelSeriesCreator {
  constructor (private readonly repository: Repository) {}

  // Define the run method to create model series
  async run ({ name, categoryId, brandId, ...otherParams }: ModelParams): Promise<void> {
    // Ensure the model series does not already exist
    await this.ensureModelSeriesDoesNotExist(name)

    let modelSeries

    // Create the model series based on the category
    if (ComputerModels.isComputerCategory({ categoryId })) { // Check if the category is a computer
      // If it is a computer category, extract computer-specific parameters
      const computerParams = otherParams as ComputerModelsPrimitives
      // Create a computer model series with the extracted parameters, name, category ID, and brand ID
      modelSeries = ComputerModels.create({ ...computerParams, name, categoryId, brandId })
    } else if (LaptopsModels.isLaptopCategory({ categoryId })) { // Check if the category is a laptop
      // If it is a laptop category, extract laptop-specific parameters
      const laptopParams = otherParams as LaptopsModelsPrimitives
      // Create a laptop model series with the extracted parameters, name, category ID, and brand ID
      modelSeries = LaptopsModels.create({ ...laptopParams, name, categoryId, brandId })
    } else if (MonitorModels.isMonitorCategory({ categoryId })) { // Check if the category is a monitor
      // If it is a monitor category, extract monitor-specific parameters
      const monitorParams = otherParams as MonitorModelsPrimitives
      // Create a monitor model series with the extracted parameters, name, category ID, and brand ID
      modelSeries = MonitorModels.create({ ...monitorParams, name, categoryId, brandId })
    } else if (ModelPrinters.isPrinterCategory({ categoryId })) { // Check if the category is a printer
      // If it is a printer category, extract printer-specific parameters
      const printerParams = otherParams as ModelPrintersPrimitives
      // Create a printer model series with the extracted parameters, name, category ID, and brand ID
      modelSeries = ModelPrinters.create({ ...printerParams, name, categoryId, brandId })
    } else {
      // If the category does not match any specific type, create a general model series with the name, category ID, and brand ID
      modelSeries = ModelSeries.create({ name, categoryId, brandId })
    }

    // Save the model series
    await this.repository.modelSeries.save(modelSeries.toPrimitives())
  }

  // Ensure that the model series does not already exist
  private async ensureModelSeriesDoesNotExist (name: string): Promise<void> {
    if (await this.repository.modelSeries.searchByName(new ModelSeriesName(name).toString()) !== null) {
      throw new ModelSeriesAlreadyExistError(name)
    }
  }
}
