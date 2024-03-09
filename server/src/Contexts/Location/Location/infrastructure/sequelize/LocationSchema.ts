import { DataTypes, Model, type Sequelize } from 'sequelize'
import { type LocationPrimitives } from '../../domain/Location'
import { type Primitives } from '../../../../Shared/domain/value-object/Primitives'
import { type LocationId } from '../../domain/LocationId'
import { type TypeOfSiteId } from '../../../TypeOfSite/domain/TypeOfSiteId'
import { type LocationName } from '../../domain/LocationName'
import { type LocationSubnet } from '../../domain/LocationSubnet'
import { type Models } from '../../../../Shared/infrastructure/persistance/Sequelize/SequelizeRepository'
import { type SiteId } from '../../../Site/domain/SiteId'

export class LocationModel extends Model<LocationPrimitives> implements LocationPrimitives {
  readonly id!: Primitives<LocationId>
  readonly typeOfSiteId!: Primitives<TypeOfSiteId>
  readonly siteId!: Primitives<SiteId>
  readonly name!: Primitives<LocationName>
  readonly subnet!: Primitives<LocationSubnet>

  public static associate (models: Models): void {
    this.belongsTo(models.TypeOfSite, { as: 'typeOfSite', foreignKey: 'typeOfSiteId' }) // A Location belongs to Many Type Of Site
    this.belongsTo(models.Site, { as: 'site', foreignKey: 'siteId' }) //  A Location belongs to Many sites
    this.hasMany(models.Employee, { as: 'employees', foreignKey: 'cargoId' }) // A Location has Many employees
  }
}

export function initLocationModel (sequelize: Sequelize): void {
  LocationModel.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
      },
      typeOfSiteId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      siteId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      subnet: {
        type: DataTypes.INET,
        allowNull: true
      }
    },
    {
      modelName: 'Location',
      timestamps: false,
      underscored: true,
      sequelize
    }
  )
}
