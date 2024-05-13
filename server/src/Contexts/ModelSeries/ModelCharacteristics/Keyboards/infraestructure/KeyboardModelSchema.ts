import { DataTypes, Model, type Sequelize } from 'sequelize'
import { type Primitives } from '../../../../Shared/domain/value-object/Primitives'
import { type ModelSeriesId } from '../../../ModelSeries/domain/ModelSeriesId'
import { type CategoryId } from '../../../../Category/domain/CategoryId'
import { type Models } from '../../../../Shared/infrastructure/persistance/Sequelize/SequelizeRepository'
import { type KeyboardModelsPrimitives } from '../domain/KeyboadModels'
import { type InputTypeId } from '../../../InputType/domain/InputTypeId'
import { CategoryValues } from '../../../../Category/domain/Category'

interface KeyboardModelsCreationAttributes extends Omit<KeyboardModelsPrimitives, 'name' | 'brandId'> {
  modelSeriesId: Primitives<ModelSeriesId>
}

export class KeyboardModelsModel extends Model<KeyboardModelsCreationAttributes> implements KeyboardModelsCreationAttributes {
  public id!: Primitives<ModelSeriesId>
  public modelSeriesId!: Primitives<ModelSeriesId>
  public categoryId!: Primitives<CategoryId>
  public inputTypeId!: Primitives<InputTypeId>

  public static associate (models: Models): void {

  }
}

export function initKeyboardModels (sequelize: Sequelize): void {
  KeyboardModelsModel.init(
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
            args: [[CategoryValues.KEYBOARD]],
            msg: 'Solo puede pertenecer a la categoria de Keyboardes'
          }
        }
      },
      inputTypeId: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    },
    {
      modelName: 'ModelKeyboard',
      underscored: true,
      sequelize
    }
  )
}
