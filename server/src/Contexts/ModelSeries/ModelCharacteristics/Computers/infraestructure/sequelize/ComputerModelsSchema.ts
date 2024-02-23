import { type Sequelize } from 'sequelize'
import { ModelSeriesModel } from '../../../../ModelSeries/infraestructure/Sequelize/ModelSeriesSchema'
import { type ComputerModelsPrimitives } from '../../domain/ComputerModels'

export class ComputerModelsModel extends ModelSeriesModel implements ComputerModelsPrimitives {
  readonly processorSocketId!: number
  readonly memoryRamTypeId!: number
  readonly memoryRamSlotQuantity!: number
  readonly hasBluetooth!: boolean
  readonly hasWifiAdapter!: boolean
  readonly hasDVI!: boolean
  readonly hasHDMI!: boolean
  readonly hasVGA!: boolean
}

export function initComputerModel (sequelize: Sequelize): void {
  ComputerModelsModel.scope('computer').init(

  )
}
