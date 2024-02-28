import { DataTypes, Model, type Sequelize } from 'sequelize'
import { type VicepresidenciaPrimitives } from '../../domain/vicepresidencia'
import { type Primitives } from '../../../../../Shared/domain/value-object/Primitives'
import { type VicepresidenciaId } from '../../domain/vicepresidenciaId'
import { type VicepresidenciaName } from '../../domain/vicepresidenciaName'
import { type Models } from '../../../../../Shared/infrastructure/persistance/Sequelize/SequelizeRepository'
import { type VicepresidenciaEjecutivaId } from '../../../VicepresidenciaEjecutiva/domain/VicepresidenciaEjecutivaId'
export class VicepresidenciaModel extends Model<VicepresidenciaPrimitives> implements VicepresidenciaPrimitives {
  readonly id!: Primitives<VicepresidenciaId>
  readonly vicepresidenciaEjecutivaId!: Primitives<VicepresidenciaEjecutivaId>
  readonly name!: Primitives<VicepresidenciaName>

  public static associate (models: Models): void {
    this.belongsTo(models.VicepresidenciaEjecutiva, { as: 'vicepresidenciaEjecutiva', foreignKey: 'vicepresidenciaEjecutivaId' })
    this.hasMany(models.Gerencia, { as: 'gerencia', foreignKey: 'gerenciaId' })
  }
}

export function initVicepresidenciaModel (sequelize: Sequelize): void {
  VicepresidenciaModel.init(
    {
      id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
      },
      vicepresidenciaEjecutivaId: {
        type: DataTypes.STRING,
        allowNull: false
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
