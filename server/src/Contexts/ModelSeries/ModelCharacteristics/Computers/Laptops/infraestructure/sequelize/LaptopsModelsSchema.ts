import { DataTypes, Model, type Sequelize } from 'sequelize'
import { type Primitives } from '../../../../../../Shared/domain/value-object/Primitives'
import { type ProcessorSocketId } from '../../../../../../Features/Processor/ProcessorSocket/domain/ProcessorSocketId'
import { type MemoryRamTypeId } from '../../../../../../Features/MemoryRam/MemoryRamType/domain/MemoryRamTypeId'
import { type CategoryId } from '../../../../../../Category/domain/CategoryId'
import { type ModelSeriesId } from '../../../../../ModelSeries/domain/ModelSeriesId'
import { type Models } from '../../../../../../Shared/infrastructure/persistance/Sequelize/SequelizeRepository'
import { type LaptopsModelsPrimitives } from '../../domain/LaptopsModels'
import { type MemoryRamSlotQuantity } from '../../../Computer/domain/MemoryRamSlotQuantity'
import { type HasBluetooth } from '../../../Computer/domain/HasBluetooth'
import { type HasWifiAdapter } from '../../../Computer/domain/HasWifiAdapter'
import { type HasDVI } from '../../../Computer/domain/HasDVI'
import { type HasHDMI } from '../../../Computer/domain/HasHDMI'
import { type HasVGA } from '../../../Computer/domain/HasVGA'
import { type BatterModelName } from '../../domain/BatteryModelName'

interface LaptopModelsCreationAttributes extends Omit<LaptopsModelsPrimitives, 'name' | 'brandId'> {
  modelSeriesId: Primitives<ModelSeriesId>
}

export class LaptopModelsModel extends Model<LaptopModelsCreationAttributes> implements LaptopModelsCreationAttributes {
  public id!: Primitives<ModelSeriesId>
  public modelSeriesId!: Primitives<ModelSeriesId>
  public categoryId!: Primitives<CategoryId>
  public processorSocketId!: Primitives<ProcessorSocketId>
  public memoryRamTypeId!: Primitives<MemoryRamTypeId>
  public memoryRamSlotQuantity!: Primitives<MemoryRamSlotQuantity>
  public hasBluetooth!: Primitives<HasBluetooth>
  public hasWifiAdapter!: Primitives<HasWifiAdapter>
  public hasDVI!: Primitives<HasDVI>
  public hasHDMI!: Primitives<HasHDMI>
  public hasVGA!: Primitives<HasVGA>
  public batteryModel!: Primitives<BatterModelName>

  public static associate (models: Models): void {
    this.belongsTo(models.Model, { as: 'model', foreignKey: 'modelSeriesId' }) // A Laptop model belongs to a model
    this.belongsTo(models.Category, { as: 'category' }) // A computer model belongs to a category
    this.belongsTo(models.ProcessorSocket, { as: 'processorSocket' }) // A computer model belongs to a processor socket
    this.belongsTo(models.MemoryRamType, { as: 'memoryRamType' }) // A computer model belongs to a memory ram
  }
}

export function initLaptopModels (sequelize: Sequelize): void {
  LaptopModelsModel.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false
      },
      modelSeriesId: {
        type: DataTypes.UUID,
        unique: true,
        allowNull: false
      },
      categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isIn: {
            args: [[3]],
            msg: 'Solo puede pertenecer a la categoria de Laptops'
          }
        }
      },
      processorSocketId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      memoryRamTypeId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      memoryRamSlotQuantity: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      hasBluetooth: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        field: 'has_bluetooth'
      },
      hasWifiAdapter: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        field: 'has_wifi_adapter'
      },
      hasDVI: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        field: 'has_dvi'
      },
      hasHDMI: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        field: 'has_hdmi'
      },
      hasVGA: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        field: 'has_vga'
      },
      batteryModel: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      modelName: 'ModelLaptop',
      underscored: true,
      sequelize
    }
  )
}
