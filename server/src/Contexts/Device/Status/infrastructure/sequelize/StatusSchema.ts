import { DataTypes, Model, type Sequelize } from 'sequelize'
import { type StatusPrimitives } from '../../domain/Status'
import { type Models } from '../../../../Shared/infrastructure/persistance/Sequelize/SequelizeRepository'
import { type Primitives } from '../../../../Shared/domain/value-object/Primitives'
import { type StatusId } from '../../domain/StatusId'
import { type StatusName } from '../../domain/StatusName'

export class StatusModel extends Model<StatusPrimitives> implements StatusPrimitives {
  readonly id!: Primitives<StatusId>
  readonly name!: Primitives<StatusName>

  public static associate (models: Models): void {
    this.hasMany(models.Device, { as: 'devices', foreignKey: 'statusId' })
  }
}

export function initStatusModel (sequelize: Sequelize): void {
  StatusModel.init(
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      }
    },
    {
      modelName: 'Status',
      tableName: 'status',
      timestamps: false,
      underscored: true,
      sequelize
    }
  )
}
