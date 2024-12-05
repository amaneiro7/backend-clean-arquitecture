import { DataTypes, Model, type Sequelize } from 'sequelize'
import { type Primitives } from '../../../../Shared/domain/value-object/Primitives'
import { type ModelSeriesId } from '../../../ModelSeries/domain/ModelSeriesId'
import { type Models } from '../../../../Shared/infrastructure/persistance/Sequelize/SequelizeRepository'
import { type MouseModelsPrimitives } from '../domain/MouseModels'
import { type InputTypeId } from '../../../InputType/domain/InputTypeId'
import { type CategoryId } from '../../../../Category/SubCategory/domain/CategoryId'
import { CategoryValues } from '../../../../Category/SubCategory/domain/Category'


interface MouseModelsCreationAttributes extends Omit<MouseModelsPrimitives, 'name' | 'brandId' | 'generic'> {
  modelSeriesId: Primitives<ModelSeriesId>
}

export class MouseModelsModel extends Model<MouseModelsCreationAttributes> implements MouseModelsCreationAttributes {
  public id!: Primitives<ModelSeriesId>
  public modelSeriesId!: Primitives<ModelSeriesId>
  public categoryId!: Primitives<CategoryId>
  public inputTypeId!: Primitives<InputTypeId>

  public static associate(models: Models): void {
    this.belongsTo(models.Model, { as: 'model', foreignKey: 'modelSeriesId' }) // A Mouse model belongs to a model
    this.belongsTo(models.Category, { as: 'category', foreignKey: 'categoryId' }) // A Mouse model belongs to a category
    this.belongsTo(models.InputType, { as: 'inputType', foreignKey: 'inputTypeId' }) // A Mouse model belongs to a InputTypes
  }
}

export function initMouseModels(sequelize: Sequelize): void {
  MouseModelsModel.init(
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
            args: [[CategoryValues.MOUSE]],
            msg: 'Solo puede pertenecer a la categoria de Mouses'
          }
        }
      },
      inputTypeId: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      modelName: 'ModelMouse',
      tableName: 'model_mouses',
      underscored: true,
      sequelize
    }
  )
}
