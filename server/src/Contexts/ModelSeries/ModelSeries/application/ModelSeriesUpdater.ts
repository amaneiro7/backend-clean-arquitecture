import { BrandDoesNotExistError } from '../../../Brand/domain/BrandDoesNotExistError'
import { BrandId } from '../../../Brand/domain/BrandId'
import { CategoryDoesNotExistError } from '../../../Category/domain/CategoryDoesNotExistError'
import { CategoryId } from '../../../Category/domain/CategoryId'
import { ModelSeriesAlreadyExistError } from '../domain/ModelSeriesAlreadyExistError'
import { ModelSeriesDoesNotExistError } from '../domain/ModelSeriesDoesNotExistError'
import { ModelSeriesId } from '../domain/ModelSeriesId'
import { ModelSeriesName } from '../domain/ModelSeriesName'
import { type Repository } from '../../../Shared/domain/Repository'
import { ModelSeries } from '../domain/ModelSeries'
import { type Primitives } from '../../../Shared/domain/value-object/Primitives'
import { ModelParams } from './ModelSeriesCreator'
import { KeyboardModels, KeyboardModelsPrimitives } from '../../ModelCharacteristics/Keyboards/domain/KeyboadModels'
import { ModelApiresponse } from '../../../Device/Device/infrastructure/sequelize/DeviceResponse'
import { ModelSeriesCategory } from '../domain/ModelSeriesCategory'
import { ModelSeriesBrand } from '../domain/ModelSeriesBrand'
import { ModelKeyboardInputType } from '../../ModelCharacteristics/Keyboards/domain/ModelKeyboardInputType'
import { HasFingerPrintReader } from '../../ModelCharacteristics/Keyboards/domain/HasFingerPrintReader'
import { ModelPrinters, ModelPrintersPrimitives } from '../../ModelCharacteristics/Printers/domain/ModelPrinters'
import { CartridgeModel } from '../../ModelCharacteristics/Printers/domain/CartridgeModel'
import { MonitorModels, MonitorModelsPrimitives } from '../../ModelCharacteristics/Monitors/domain/MonitorModels'
import { MonitorHasDVI } from '../../ModelCharacteristics/Monitors/domain/MonitorHasDVI'
import { MonitorHasVGA } from '../../ModelCharacteristics/Monitors/domain/MonitorHasVGA'
import { MonitorHasHDMI } from '../../ModelCharacteristics/Monitors/domain/MonitorHasHDMI'
import { MonitorScreenSize } from '../../ModelCharacteristics/Monitors/domain/MonitorScreenSize'
import { LaptopsModels, LaptopsModelsPrimitives } from '../../ModelCharacteristics/Computers/Laptops/domain/LaptopsModels'
import { HasVGA } from '../../ModelCharacteristics/Computers/Computer/domain/HasVGA'
import { HasDVI } from '../../ModelCharacteristics/Computers/Computer/domain/HasDVI'
import { HasHDMI } from '../../ModelCharacteristics/Computers/Computer/domain/HasHDMI'
import { HasBluetooth } from '../../ModelCharacteristics/Computers/Computer/domain/HasBluetooth'
import { HasWifiAdapter } from '../../ModelCharacteristics/Computers/Computer/domain/HasWifiAdapter'
import { BatteryModelName } from '../../ModelCharacteristics/Computers/Laptops/domain/BatteryModelName'
import { MemoryRamSlotQuantity } from '../../ModelCharacteristics/Computers/Computer/domain/MemoryRamSlotQuantity'
import { ComputerMemoryRamType } from '../../ModelCharacteristics/Computers/Computer/domain/ComputerMemoryRamType'
import { ComputerModels } from '../../ModelCharacteristics/Computers/Computer/domain/ComputerModels'
import { Generic } from '../domain/Generic'

export class ModelSeriesUpdater {
  constructor(private readonly repository: Repository) { }

  async run({ id, params }: { id: Primitives<ModelSeriesId>, params: ModelParams }): Promise<void> {
    const { categoryId } = params

    const modelSeriesId = new ModelSeriesId(id).value

    const modelSeries = await this.repository.modelSeries.searchById(modelSeriesId)

    if (modelSeries === null) {
      throw new ModelSeriesDoesNotExistError(id)
    }

    let modelEntity
    // Actualizar la tabla de Teclado
    if (KeyboardModels.isKeyboardCategory({ categoryId })) {
      const { modelKeyboard } = modelSeries as unknown as ModelApiresponse
      modelEntity = KeyboardModels.fromPrimitives({
        id: modelSeries.id,
        name: modelSeries.name,
        categoryId: modelSeries.categoryId,
        generic: modelSeries.generic,
        brandId: modelSeries.brandId,
        inputTypeId: modelKeyboard?.inputTypeId,
        hasFingerPrintReader: modelKeyboard?.hasFingerPrintReader,
      })
      const keyboardParams = params as KeyboardModelsPrimitives
      await ModelKeyboardInputType.updateInputTypeField({ repository: this.repository.inputType, inputTypeId: keyboardParams.inputTypeId, entity: modelEntity })
      await HasFingerPrintReader.updateFingerprintField({ hasFingerPrintReader: keyboardParams.hasFingerPrintReader, entity: modelEntity })
    }
    // Actualizar la tabla de Impresora laser y tinta
    else if (ModelPrinters.isPrinterCategory({ categoryId })) {
      const { modelPrinter } = modelSeries as unknown as ModelApiresponse
      modelEntity = ModelPrinters.fromPrimitives({
        id: modelSeries.id,
        name: modelSeries.name,
        categoryId: modelSeries.categoryId,
        generic: modelSeries.generic,
        brandId: modelSeries.brandId,
        cartridgeModel: modelPrinter.cartridgeModel
      })
      const printerParams = params as ModelPrintersPrimitives
      await CartridgeModel.updateCartridgeModelField({ cartridgeModel: printerParams.cartridgeModel, entity: modelEntity })
    }
    // Actualizar la tabla de monitores
    else if (MonitorModels.isMonitorCategory({ categoryId })) {
      const { modelMonitor } = modelSeries as unknown as ModelApiresponse
      modelEntity = MonitorModels.fromPrimitives({
        id: modelSeries.id,
        name: modelSeries.name,
        categoryId: modelSeries.categoryId,
        generic: modelSeries.generic,
        brandId: modelSeries.brandId,
        screenSize: modelMonitor.screenSize,
        hasVGA: modelMonitor.hasVGA,
        hasDVI: modelMonitor.hasDVI,
        hasHDMI: modelMonitor.hasHDMI
      })
      const monitorParams = params as MonitorModelsPrimitives
      await MonitorHasDVI.updateDVIField({ hasDVI: monitorParams.hasDVI, entity: modelEntity })
      await MonitorHasVGA.updateVGAField({ hasVGA: monitorParams.hasVGA, entity: modelEntity })
      await MonitorHasHDMI.updateDVIField({ hasHDMI: monitorParams.hasHDMI, entity: modelEntity })
      await MonitorScreenSize.updateScreenSizeField({ ScreenSize: monitorParams.screenSize, entity: modelEntity })
    }
    // Actualizar la tabla de Laptop
    else if (LaptopsModels.isLaptopCategory({ categoryId })) {
      const { modelLaptop } = modelSeries as unknown as ModelApiresponse
      modelEntity = LaptopsModels.fromPrimitives({
        id: modelSeries.id,
        name: modelSeries.name,
        categoryId: modelSeries.categoryId,
        generic: modelSeries.generic,
        brandId: modelSeries.brandId,
        memoryRamSlotQuantity: modelLaptop.memoryRamSlotQuantity,
        memoryRamTypeId: modelLaptop.memoryRamTypeId,
        hasDVI: modelLaptop.hasDVI,
        hasHDMI: modelLaptop.hasHDMI,
        hasVGA: modelLaptop.hasVGA,
        hasBluetooth: modelLaptop.hasBluetooth,
        hasWifiAdapter: modelLaptop.hasWifiAdapter,
        batteryModel: modelLaptop.batteryModel,
      })
      const laptopParams = params as LaptopsModelsPrimitives
      await HasVGA.updateVGAField({ hasVGA: laptopParams.hasVGA, entity: modelEntity })
      await HasDVI.updateDVIField({ hasDVI: laptopParams.hasDVI, entity: modelEntity })
      await HasHDMI.updateDVIField({ hasHDMI: laptopParams.hasHDMI, entity: modelEntity })
      await HasBluetooth.updateBluetoothField({ hasBluetooth: laptopParams.hasBluetooth, entity: modelEntity })
      await HasWifiAdapter.updateWifiAdapterField({ hasWifiAdapter: laptopParams.hasWifiAdapter, entity: modelEntity })
      await BatteryModelName.updateBatteryModelField({ batteryModel: laptopParams.batteryModel, entity: modelEntity })
      await MemoryRamSlotQuantity.updateMemoryRamSlotQuantityField({ memoryRamSlotQuantity: laptopParams.memoryRamSlotQuantity, entity: modelEntity })
      await ComputerMemoryRamType.updateInputTypeField({ repository: this.repository.memoryRamType, memoryRamTypeId: laptopParams.memoryRamTypeId, entity: modelEntity })
    }
    // Actualizar la tabla de Computadoras
    else if (ComputerModels.isComputerCategory({ categoryId })) {
      const { modelComputer } = modelSeries as unknown as ModelApiresponse
      modelEntity = ComputerModels.fromPrimitives({
        id: modelSeries.id,
        name: modelSeries.name,
        categoryId: modelSeries.categoryId,
        generic: modelSeries.generic,
        brandId: modelSeries.brandId,
        memoryRamSlotQuantity: modelComputer.memoryRamSlotQuantity,
        memoryRamTypeId: modelComputer.memoryRamTypeId,
        hasDVI: modelComputer.hasDVI,
        hasHDMI: modelComputer.hasHDMI,
        hasVGA: modelComputer.hasVGA,
        hasBluetooth: modelComputer.hasBluetooth,
        hasWifiAdapter: modelComputer.hasWifiAdapter,
      })
      const computerParams = params as LaptopsModelsPrimitives
      await HasVGA.updateVGAField({ hasVGA: computerParams.hasVGA, entity: modelEntity })
      await HasDVI.updateDVIField({ hasDVI: computerParams.hasDVI, entity: modelEntity })
      await HasHDMI.updateDVIField({ hasHDMI: computerParams.hasHDMI, entity: modelEntity })
      await HasBluetooth.updateBluetoothField({ hasBluetooth: computerParams.hasBluetooth, entity: modelEntity })
      await HasWifiAdapter.updateWifiAdapterField({ hasWifiAdapter: computerParams.hasWifiAdapter, entity: modelEntity })
      await MemoryRamSlotQuantity.updateMemoryRamSlotQuantityField({ memoryRamSlotQuantity: computerParams.memoryRamSlotQuantity, entity: modelEntity })
      await ComputerMemoryRamType.updateInputTypeField({ repository: this.repository.memoryRamType, memoryRamTypeId: computerParams.memoryRamTypeId, entity: modelEntity })
    }
    else {
      modelEntity = ModelSeries.fromPrimitives(modelSeries)
    }
    await this.updateMainModel({ params, entity: modelEntity })
    await this.repository.modelSeries.save(modelEntity.toPrimitives())
  }

  private async updateMainModel({ params, entity }: { params: ModelParams, entity: ModelSeries }): Promise<void> {
    await ModelSeriesCategory.updateCategoryField({ repository: this.repository.category, categoryId: params.categoryId, entity })
    await ModelSeriesBrand.updateBrandField({ repository: this.repository.brand, brandId: params.brandId, entity })
    await ModelSeriesName.updateNameField({ repository: this.repository.modelSeries, name: params.name, entity })
    await Generic.updateGenericField({ generic: params.generic, entity })

  }
}
