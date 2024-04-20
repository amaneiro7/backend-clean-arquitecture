import { DataTypes, Model, type Sequelize } from 'sequelize'
import { type OperatingSystemPrimitives } from '../../domain/OperatingSystem'
import { type Models } from '../../../../../Shared/infrastructure/persistance/Sequelize/SequelizeRepository'
import { type Primitives } from '../../../../../Shared/domain/value-object/Primitives'
import { type OperatingSystemId } from '../../domain/OperatingSystemId'
import { type OperatingSystemVersion } from '../../domain/OperatingSystemVersion'

export class OperatingSystemModel extends Model<OperatingSystemPrimitives> implements OperatingSystemPrimitives {
  readonly id!: Primitives<OperatingSystemId>
  readonly name!: Primitives<OperatingSystemVersion>

  public static associate (models: Models): void {
    this.hasMany(models.DeviceComputer, { as: 'computer', foreignKey: 'operatingSystemId' }) // An operating system can have many computers
  }
}

export function initOperatingSystemModel (sequelize: Sequelize): void {
  OperatingSystemModel.init(
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
      modelName: 'OperatingSystemVersion',
      timestamps: false,
      underscored: true,
      sequelize
    }
  )
}
