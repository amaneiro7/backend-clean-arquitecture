import { DataTypes, Model, type Sequelize } from 'sequelize'
import { type InputTypePrimitives } from '../../domain/InputType'
import { type Models } from '../../../../Shared/infrastructure/persistance/Sequelize/SequelizeRepository'
import { Primitives } from '../../../../Shared/domain/value-object/Primitives'
import { InputTypeId } from '../../domain/InputTypeId'
import { InputTypeName } from '../../domain/InputTypeName'

export class InputTypeModel extends Model<InputTypePrimitives> implements InputTypePrimitives {
  readonly id!: Primitives<InputTypeId>
  readonly name!: Primitives<InputTypeName>

  public static associate (models: Models): void {

  }
}

export function initInputTypeModel (sequelize: Sequelize): void {
  InputTypeModel.init(
    {
      id: {
        type: DataTypes.STRING,
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
      modelName: 'InputType',
      timestamps: false,
      underscored: true,
      sequelize
    }
  )
}
