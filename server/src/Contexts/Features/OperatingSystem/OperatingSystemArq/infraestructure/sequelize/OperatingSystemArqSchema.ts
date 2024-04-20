import { DataTypes, Model, type Sequelize } from 'sequelize'
import { type OperatingSystemArqPrimitives } from '../../domain/OperatingSystemArq'
import { type Models } from '../../../../../Shared/infrastructure/persistance/Sequelize/SequelizeRepository'
import { type Primitives } from '../../../../../Shared/domain/value-object/Primitives'
import { type OperatingSystemArqId } from '../../domain/OperatingSystemArqID'
import { type OperatingSystemArqName } from '../../domain/OperatingSystemArqName'

export class OperatingSystemArqModel extends Model<OperatingSystemArqPrimitives> implements OperatingSystemArqPrimitives {
  readonly id!: Primitives<OperatingSystemArqId>
  readonly name!: Primitives<OperatingSystemArqName>

  public static associate (models: Models): void {
    this.hasMany(models.DeviceComputer, { as: 'computer', foreignKey: 'operatingSystemArqId' }) // An operating system arq can have many computer
  }
}

export function initOperatingSystemArqModel (sequelize: Sequelize): void {
  OperatingSystemArqModel.init(
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
      modelName: 'OperatingSystemArq',
      timestamps: false,
      underscored: true,
      sequelize
    }
  )
}
