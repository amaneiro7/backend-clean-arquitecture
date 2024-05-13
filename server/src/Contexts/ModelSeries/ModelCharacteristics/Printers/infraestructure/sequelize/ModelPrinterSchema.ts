import { DataTypes, Model, type Sequelize } from 'sequelize'
import { type Primitives } from '../../../../../Shared/domain/value-object/Primitives'
import { type CategoryId } from '../../../../../Category/domain/CategoryId'
import { type ModelSeriesId } from '../../../../ModelSeries/domain/ModelSeriesId'
import { type Models } from '../../../../../Shared/infrastructure/persistance/Sequelize/SequelizeRepository'
import { type ModelPrintersPrimitives } from '../../domain/ModelPrinters'
import { type CartridgeModel } from '../../domain/CartridgeModel'

interface ModelPrinterCreationAttributes extends Omit<ModelPrintersPrimitives, 'name' | 'brandId'> {
  modelSeriesId: Primitives<ModelSeriesId>
}

export class ModelPrinterModel extends Model<ModelPrinterCreationAttributes> implements ModelPrinterCreationAttributes {
  public id!: Primitives<ModelSeriesId>
  public cartridgeModel!: Primitives<CartridgeModel>
  public modelSeriesId!: Primitives<ModelSeriesId>
  public categoryId!: Primitives<CategoryId>

  public static associate (models: Models): void {
    this.belongsTo(models.Model, { as: 'model', foreignKey: 'modelSeriesId' }) // A Laptop model belongs to a model
    this.belongsTo(models.Category, { as: 'category' }) // A computer model belongs to a category
  }
}

export function initModelPrinter (sequelize: Sequelize): void {
  ModelPrinterModel.init(
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
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isIn: {
            args: [['7', '8']],
            msg: 'Solo puede pertenecer a la categoria de Impresoras Laser e Impresoras Tinta'
          }
        }
      },
      cartridgeModel: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      modelName: 'ModelPrinter',
      underscored: true,
      sequelize
    }
  )
}
