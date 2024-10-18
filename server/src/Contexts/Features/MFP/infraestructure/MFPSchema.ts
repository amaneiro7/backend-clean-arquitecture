import { DataTypes, Model, type Sequelize } from 'sequelize'
import { type DeviceId } from '../../../Device/Device/domain/DeviceId'
import { type MFPIPAddress } from '../domain/MFPIPAddress'
import { type DeviceMFPPrimitives } from '../domain/MFP'
import { type Primitives } from '../../../Shared/domain/value-object/Primitives'
import { type Models } from '../../../Shared/infrastructure/persistance/Sequelize/SequelizeRepository'
import { type CategoryId } from '../../../Category/SubCategory/domain/CategoryId'
import { CategoryValues } from '../../../Category/SubCategory/domain/Category'

interface MFPCreationAttributes extends Pick<DeviceMFPPrimitives, 'id' | 'categoryId' | 'ipAddress'> {
  deviceId: Primitives<DeviceId>
}
export class DeviceMFPModel extends Model<MFPCreationAttributes> implements MFPCreationAttributes {
  readonly deviceId!: Primitives<DeviceId>
  readonly id!: Primitives<DeviceId>
  readonly categoryId!: Primitives<CategoryId>
  readonly ipAddress!: Primitives<MFPIPAddress>


  public static associate(models: Models): void {
    this.belongsTo(models.Device, { as: 'device', foreignKey: 'deviceId' }) // A computer belongs to a device
    this.belongsTo(models.Category, { as: 'category', foreignKey: 'categoryId' }) // A computer belongs to a category    
  }
}

export function initDeviceMFPModel(sequelize: Sequelize): void {
  DeviceMFPModel.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false
      },
      categoryId: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isIn: {
            args: [[CategoryValues.MFP]],
            msg: 'No pertenece a esta categoria'
          }
        }
      },
      deviceId: {
        type: DataTypes.UUID,
        allowNull: false
      },
      ipAddress: {
        type: DataTypes.INET,
        allowNull: true,
        validate: {
          isIPv4: true
        }
      }
    },
    {
      modelName: 'DeviceMFP',
      tableName: 'device_mfp',
      timestamps: true,
      underscored: true,
      sequelize
    }
  )
}
