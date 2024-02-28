import { DataTypes, Model, type Sequelize } from 'sequelize'
import { type Primitives } from '../../../../../Shared/domain/value-object/Primitives'
import { type CoordinacionId } from '../../domain/CoordinacionId'
import { type CoordinacionName } from '../../domain/CoordinacionName'
import { type CoordinacionPrimitives } from '../../domain/Coordinacion'
import { type Models } from '../../../../../Shared/infrastructure/persistance/Sequelize/SequelizeRepository'

export class CoordinacionModel extends Model<CoordinacionPrimitives> implements CoordinacionPrimitives {
  readonly id!: Primitives<CoordinacionId>
  readonly name!: Primitives<CoordinacionName>

  public static associate (models: Models): void {}
}

export function initCoordinacionModel (sequelize: Sequelize): void {
  CoordinacionModel.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      }
    },
    {
      modelName: 'Coordinacion',
      underscored: true,
      timestamps: false,
      sequelize
    }
  )
}
