import { DataTypes, Model, type Sequelize } from 'sequelize'
import { type ComputerModelsPrimitives } from '../../domain/ComputerModels'
import { type Primitives } from '../../../../../Shared/domain/value-object/Primitives'
import { type ProcessorSocketId } from '../../../../../Features/Processor/ProcessorSocket/domain/ProcessorSocketId'
import { type MemoryRamTypeId } from '../../../../../Features/MemoryRam/MemoryRamType/domain/MemoryRamTypeId'
import { type MemoryRamSlotQuantity } from '../../domain/MemoryRamSlotQuantity'
import { type HasBluetooth } from '../../domain/HasBluetooth'
import { type HasWifiAdapter } from '../../domain/HasWifiAdapter'
import { type HasDVI } from '../../domain/HasDVI'
import { type HasHDMI } from '../../domain/HasHDMI'
import { type HasVGA } from '../../domain/HasVGA'
import { type CategoryId } from '../../../../../Category/domain/CategoryId'
import { type ModelSeriesId } from '../../../../ModelSeries/domain/ModelSeriesId'
import { type Models } from '../../../../../Shared/infrastructure/persistance/Sequelize/SequelizeRepository'

export class ComputerModelsModel extends Model<Omit<ComputerModelsPrimitives, 'name' | 'brandId'>> implements Omit<ComputerModelsPrimitives, 'name' | 'brandId'> {
  public id!: Primitives<ModelSeriesId>
  public categoryId!: Primitives<CategoryId>
  public processorSocketId!: Primitives<ProcessorSocketId>
  public memoryRamTypeId!: Primitives<MemoryRamTypeId>
  public memoryRamSlotQuantity!: Primitives<MemoryRamSlotQuantity>
  public hasBluetooth!: Primitives<HasBluetooth>
  public hasWifiAdapter!: Primitives<HasWifiAdapter>
  public hasDVI!: Primitives<HasDVI>
  public hasHDMI!: Primitives<HasHDMI>
  public hasVGA!: Primitives<HasVGA>

  public static associate (models: Models): void {
    this.belongsTo(models.Model, { as: 'model' }) // A computer model belongs to a model
    this.belongsTo(models.Category, { as: 'category' }) // A computer model belongs to a category
  }
}

export function initComputerModels (sequelize: Sequelize): void {
  ComputerModelsModel.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false
      },
      categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isIn: {
            args: [[1]],
            msg: 'Solo puede pertenecer a la categoria de Computadoras'
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
      }
    },
    {
      modelName: 'ModelComputer',
      underscored: true,
      sequelize
    }
  )
}
