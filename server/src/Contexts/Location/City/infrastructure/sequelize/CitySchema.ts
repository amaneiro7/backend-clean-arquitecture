import { DataTypes, Model, type Sequelize } from 'sequelize'
import { type Models } from '../../../../Shared/infrastructure/persistance/Sequelize/SequelizeRepository'
import { type Primitives } from '../../../../Shared/domain/value-object/Primitives'
import { type CityPrimitives } from '../../domain/City'
import { type CityId } from '../../domain/CityId'
import { type StateId } from '../../../State/domain/StateId'
import { type CityName } from '../../domain/CityName'

export class CityModel extends Model<CityPrimitives> implements CityPrimitives {
  readonly id!: Primitives<CityId>
  readonly stateId!: Primitives<StateId>
  readonly name!: Primitives<CityName>

  public static associate (models: Models): void {
    this.belongsTo(models.State, { as: 'state', foreignKey: 'stateId' }) // A City can belong to a state
    this.hasMany(models.Site, { as: 'sites', foreignKey: 'cityId' }) //  A city has many Sites
  }
}

export function initCityModel (sequelize: Sequelize): void {
  CityModel.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false
      },
      stateId: {
        type: DataTypes.UUID,
        allowNull: false
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false
      }
    },
    {
      modelName: 'City',
      timestamps: false,
      underscored: true,
      sequelize
    }
  )
}
