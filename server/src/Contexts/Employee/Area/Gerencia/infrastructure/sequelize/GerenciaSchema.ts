import { DataTypes, Model, type Sequelize } from 'sequelize'
import { type Primitives } from '../../../../../Shared/domain/value-object/Primitives'
import { type GerenciaId } from '../../domain/GerenciaId'
import { type GerenciaName } from '../../domain/GerenciaName'
import { type GerenciaPrimitives } from '../../domain/Gerencia'
import { type Models } from '../../../../../Shared/infrastructure/persistance/Sequelize/SequelizeRepository'

export class GerenciaModel extends Model<GerenciaPrimitives> implements GerenciaPrimitives {
  readonly id!: Primitives<GerenciaId>
  readonly name!: Primitives<GerenciaName>

  public static associate (models: Models): void {}
}

export function initGerenciaModel (sequelize: Sequelize): void {
  GerenciaModel.init(
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
      modelName: 'Gerencia',
      sequelize
    }
  )
}
