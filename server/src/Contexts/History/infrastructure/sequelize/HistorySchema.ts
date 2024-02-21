import { DataTypes, Model, type Sequelize } from 'sequelize'
import { type HistoryPrimitives } from '../../domain/History'
import { type ActionType, acionTypes } from '../../domain/HistoryAction'

export class HistoryModel extends Model<HistoryPrimitives> implements HistoryPrimitives {
  readonly id!: string
  readonly tableName!: string
  readonly rowId!: string
  readonly action!: ActionType
  readonly createdAt!: Date
  readonly userId!: string
  readonly oldData!: object
  readonly newData!: object
}

export function initHistoryModel (sequelize: Sequelize): void {
  HistoryModel.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false
      },
      tableName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      rowId: {
        type: DataTypes.UUID,
        allowNull: false
      },
      action: {
        type: DataTypes.ENUM,
        values: Object.values(acionTypes),
        allowNull: false
      },
      userId: {
        type: DataTypes.UUID,
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
