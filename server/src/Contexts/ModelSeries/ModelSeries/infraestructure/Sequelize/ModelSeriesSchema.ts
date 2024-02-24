import { DataTypes, Model, type Sequelize } from 'sequelize'
import { type ModelSeriesPrimitives } from '../../domain/ModelSeries'
import { type Models } from '../../../../Shared/infrastructure/persistance/Sequelize/SequelizeRepository'

export class ModelSeriesModel extends Model<ModelSeriesPrimitives> implements ModelSeriesPrimitives {
  readonly id!: string
  readonly name!: string
  readonly categoryId!: number
  readonly brandId!: string

  public static associate (models: Models): void {
    this.belongsTo(models.Category, { as: 'category' }) // A model series belongs to a category
    this.belongsTo(models.Brand, { as: 'brand' }) // A model series belongs to a brand
    this.hasMany(models.Device, { as: 'device' }) // A model series can have many devices
    this.hasOne(models.ModelComputer, { as: 'modelComputer', foreignKey: 'id' }) // A model series has one computer model (if it is a computer)
  }
}

export function initModelSeriesModel (sequelize: Sequelize): void {
  ModelSeriesModel.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      brandId: {
        type: DataTypes.UUID,
        allowNull: false
      }
    },
    {
      modelName: 'Model',
      timestamps: true,
      underscored: true,
      sequelize
    }
  )
}
