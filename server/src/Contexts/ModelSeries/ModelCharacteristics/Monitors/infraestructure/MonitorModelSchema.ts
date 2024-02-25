import { DataTypes, Model, type Sequelize } from 'sequelize'
import { type Primitives } from '../../../../Shared/domain/value-object/Primitives'
import { type ModelSeriesId } from '../../../ModelSeries/domain/ModelSeriesId'
import { type MonitorModelsPrimitives } from '../domain/MonitorModels'
import { type MonitorScreenSize } from '../domain/MonitorScreenSize'
import { type CategoryId } from '../../../../Category/domain/CategoryId'
import { type HasDVI } from '../domain/HasDVI'
import { type HasHDMI } from '../domain/HasHDMI'
import { type HasVGA } from '../domain/HasVGA'
import { type Models } from '../../../../Shared/infrastructure/persistance/Sequelize/SequelizeRepository'

interface MonitorModelsCreationAttributes extends Omit<MonitorModelsPrimitives, 'name' | 'brandId'> {
  modelSeriesId: Primitives<ModelSeriesId>
}

export class MonitorModelsModel extends Model<MonitorModelsCreationAttributes> implements MonitorModelsCreationAttributes {
  public id!: Primitives<ModelSeriesId>
  public modelSeriesId!: Primitives<ModelSeriesId>
  public categoryId!: Primitives<CategoryId>
  public screenSize!: Primitives<MonitorScreenSize>
  public hasDVI!: Primitives<HasDVI>
  public hasHDMI!: Primitives<HasHDMI>
  public hasVGA!: Primitives<HasVGA>

  public static associate (models: Models): void {
    this.belongsTo(models.Model, { as: 'model', foreignKey: 'modelSeriesId' }) // A monitor model belongs to a model
    this.belongsTo(models.Category, { as: 'category' }) // A monitor model belongs to a category
  }
}

export function initMonitorModels (sequelize: Sequelize): void {
  MonitorModelsModel.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false
      },
      modelSeriesId: {
        type: DataTypes.UUID,
        unique: true,
        allowNull: false
      },
      categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isIn: {
            args: [[5]],
            msg: 'Solo puede pertenecer a la categoria de Monitores'
          }
        }
      },
      screenSize: {
        type: DataTypes.STRING,
        allowNull: false
      },
      hasDVI: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        field: 'has_dvi'
      },
      hasHDMI: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        field: 'has_hdmi'
      },
      hasVGA: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        field: 'has_vga'
      }
    },
    {
      modelName: 'ModelMonitor',
      underscored: true,
      sequelize
    }
  )
}
