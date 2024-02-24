import { DataTypes, Model, type Sequelize } from 'sequelize'
import { type ComputerModelsPrimitives } from '../../domain/ComputerModels'

export class ComputerModelsModel extends Model<ComputerModelsPrimitives> {
  public processorSocketId!: number
  public memoryRamTypeId!: number
  public memoryRamSlotQuantity!: number
  public hasBluetooth!: boolean
  public hasWifiAdapter!: boolean
  public hasDVI!: boolean
  public hasHDMI!: boolean
  public hasVGA!: boolean
}

export function initComputerModels (sequelize: Sequelize): void {
  ComputerModelsModel.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      brandId: {
        type: DataTypes.UUID,
        allowNull: false
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
        allowNull: false
      },
      hasWifiAdapter: {
        type: DataTypes.BOOLEAN,
        allowNull: false
      },
      hasDVI: {
        type: DataTypes.BOOLEAN,
        allowNull: false
      },
      hasHDMI: {
        type: DataTypes.BOOLEAN,
        allowNull: false
      },
      hasVGA: {
        type: DataTypes.BOOLEAN,
        allowNull: false
      }
    },
    {
      modelName: 'computer_models',
      underscored: true,
      sequelize
    }

  )
}
