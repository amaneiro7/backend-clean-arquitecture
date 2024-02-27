import { DataTypes, Model, type Sequelize } from 'sequelize'
import { type Models } from '../../../../Shared/infrastructure/persistance/Sequelize/SequelizeRepository'
import { type Primitives } from '../../../../Shared/domain/value-object/Primitives'
import { type RegionPrimitives } from '../../domain/Region'
import { type RegionId } from '../../domain/RegionId'
import { type RegionName } from '../../domain/RegionName'

export class RegionModel extends Model<RegionPrimitives> implements RegionPrimitives {
  readonly id!: Primitives<RegionId>
  readonly name!: Primitives<RegionName>

  public static associate (models: Models): void {
    this.hasMany(models.State, { as: 'state', foreignKey: 'stateId' }) // An Region can hava many states
  }
}

export function initRegionModel (sequelize: Sequelize): void {
  RegionModel.init(
    {
      id: {
        type: DataTypes.INTEGER,
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
      modelName: 'Region',
      timestamps: false,
      underscored: true,
      sequelize
    }
  )
}
