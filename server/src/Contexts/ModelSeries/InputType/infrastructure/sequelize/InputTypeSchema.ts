import { DataTypes, Model, type Sequelize } from 'sequelize'
import { type InputTypePrimitives } from '../../domain/InputType'
import { type Models } from '../../../../Shared/infrastructure/persistance/Sequelize/SequelizeRepository'

export class InputTypeModel extends Model<InputTypePrimitives> implements InputTypePrimitives {
  readonly id!: number
  readonly name!: string

  public static associate (models: Models): void {

  }
}

export function initInputTypeModel (sequelize: Sequelize): void {
  InputTypeModel.init(
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
      modelName: 'InputType',
      timestamps: false,
      underscored: true,
      sequelize
    }
  )
}
