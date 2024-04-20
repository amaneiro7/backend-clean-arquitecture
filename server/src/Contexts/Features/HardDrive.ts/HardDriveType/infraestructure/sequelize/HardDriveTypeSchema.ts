import { DataTypes, Model, type Sequelize } from 'sequelize'
import { type HardDriveTypePrimitives } from '../../domain/HardDriveType'
import { type Models } from '../../../../../Shared/infrastructure/persistance/Sequelize/SequelizeRepository'
import { type Primitives } from '../../../../../Shared/domain/value-object/Primitives'
import { type HardDriveTypeName } from '../../domain/HardDriveTypeName'
import { type HardDriveTypeId } from '../../domain/HardDriveTypeId'

export class HardDriveTypeModel extends Model<HardDriveTypePrimitives> implements HardDriveTypePrimitives {
  readonly id!: Primitives<HardDriveTypeId>
  readonly name!: Primitives<HardDriveTypeName>

  public static associate (models: Models): void {
    this.hasMany(models.DeviceHardDrive, { as: 'hardDrive', foreignKey: 'hardDriveTypeId' }) // A hard drive type can have many hard drive
    this.hasMany(models.DeviceComputer, { as: 'computer', foreignKey: 'hardDriveTypeId' }) // A hard drive type can have many computer
  }
}

export function initHardDriveTypeModel (sequelize: Sequelize): void {
  HardDriveTypeModel.init(
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
      modelName: 'HardDriveType',
      timestamps: false,
      underscored: true,
      sequelize
    }
  )
}
