import { DataTypes, Model, type Sequelize } from 'sequelize'
import { type SitePrimitives } from '../../domain/Site'
import { type Primitives } from '../../../../Shared/domain/value-object/Primitives'
import { type SiteId } from '../../domain/SiteId'
import { type CityId } from '../../../City/domain/CityId'
import { type SiteName } from '../../domain/SiteName'
import { type SiteAddress } from '../../domain/SiteAddress'
import { type Models } from '../../../../Shared/infrastructure/persistance/Sequelize/SequelizeRepository'

export class SiteModels extends Model<SitePrimitives> implements SitePrimitives {
  readonly id!: Primitives<SiteId>
  readonly cityId!: Primitives<CityId>
  readonly address!: Primitives<SiteAddress>
  readonly name!: Primitives<SiteName>

  public static associate (models: Models): void {
    this.belongsTo(models.City, { as: 'city', foreignKey: 'cityId' })
    this.hasMany(models.Location, { as: 'location', foreignKey: 'siteId' })
  }
}

export function initSiteModel (sequelize: Sequelize): void {
  SiteModels.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
      },
      cityId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      address: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      }
    },
    {
      modelName: 'Site',
      timestamps: false,
      underscored: true,
      sequelize
    }
  )
}
