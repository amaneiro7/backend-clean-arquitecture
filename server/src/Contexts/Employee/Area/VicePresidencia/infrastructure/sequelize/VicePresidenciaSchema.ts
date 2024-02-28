import { DataTypes, Model, type Sequelize } from 'sequelize'
import { type VicepresidenciaPrimitives } from '../../domain/vicepresidencia'
import { type Primitives } from '../../../../../Shared/domain/value-object/Primitives'
import { type VicePresidenciaId } from '../../domain/vicepresidenciaId'
import { type VicePresidenciaName } from '../../domain/vicepresidenciaName'
import { type Models } from '../../../../../Shared/infrastructure/persistance/Sequelize/SequelizeRepository'
export class VicePresidenciaModel extends Model<VicepresidenciaPrimitives> implements VicepresidenciaPrimitives {
  readonly id!: Primitives<VicePresidenciaId>
  readonly name!: Primitives<VicePresidenciaName>

  public static associate (models: Models): void {

  }
}

export function initVicePresidenciaModel (sequelize: Sequelize): void {
  VicePresidenciaModel.init(
    {
      id: {
        type: DataTypes.STRING,
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
      modelName: 'Viceprecidencia',
      underscored: true,
      timestamps: false,
      sequelize
    }
  )
}
