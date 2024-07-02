import { DataTypes, Model, type Sequelize } from 'sequelize'
import { type HistoryPrimitives } from '../../domain/History'
import { type ActionType, acionTypes } from '../../domain/HistoryAction'
import { type Models } from '../../../Shared/infrastructure/persistance/Sequelize/SequelizeRepository'
import { Primitives } from '../../../Shared/domain/value-object/Primitives'
import { DeviceId } from '../../../Device/Device/domain/DeviceId'
import { HistoryId } from '../../domain/HistoryId'
import { UserId } from '../../../User/user/domain/UserId'

export class HistoryModel extends Model<HistoryPrimitives> implements HistoryPrimitives {
  readonly id!: Primitives<HistoryId>
  readonly deviceId!: Primitives<DeviceId>
  readonly action!: ActionType
  readonly userId!: Primitives<UserId>
  readonly oldData!: object
  readonly newData!: object
  readonly createdAt!: Date

  public static associate(models: Models): void {
    this.belongsTo(models.User, { as: 'user' }) // A history belongs to a user
    this.belongsTo(models.Device, { as: 'device' }) // A history belongs to a device
  }
}

export function initHistoryModel(sequelize: Sequelize): void {
  HistoryModel.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false
      },
      deviceId: {
        type: DataTypes.UUID,
        allowNull: false
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false
      },
      action: {
        type: DataTypes.ENUM,
        values: Object.values(acionTypes),
        allowNull: false
      },
      oldData: {
        type: DataTypes.JSON,
        allowNull: false
      },
      newData: {
        type: DataTypes.JSON,
        allowNull: false
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false
      }
    },
    {
      modelName: 'History',
      underscored: true,
      createdAt: true,
      sequelize
    }
  )
}
