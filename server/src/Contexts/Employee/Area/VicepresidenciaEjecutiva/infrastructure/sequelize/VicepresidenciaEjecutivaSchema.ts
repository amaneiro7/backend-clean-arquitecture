import { DataTypes, Model, type Sequelize } from 'sequelize'
import { type VicepresidenciaEjecutivaPrimitives } from '../../domain/VicepresidenciaEjecutiva'
import { type Primitives } from '../../../../../Shared/domain/value-object/Primitives'
import { type VicepresidenciaEjecutivaId } from '../../domain/VicepresidenciaEjecutivaId'
import { type VicepresidenciaEjecutivaName } from '../../domain/VicepresidenciaEjecutivaName'
import { type Models } from '../../../../../Shared/infrastructure/persistance/Sequelize/SequelizeRepository'

export class VicepresidenciaEjecutivaModel extends Model<VicepresidenciaEjecutivaPrimitives> implements VicepresidenciaEjecutivaPrimitives {
  readonly id!: Primitives<VicepresidenciaEjecutivaId>
  readonly name!: Primitives<VicepresidenciaEjecutivaName>

  public static associate (models: Models): void {
    this.hasMany(models.Vicepresidencia, { as: 'vicepresidencia', foreignKey: 'vicepresidenciaEjecutivaId' })
  }
}

export function initVicepresidenciaEjecutivaModel (sequelize: Sequelize): void {
  VicepresidenciaEjecutivaModel.init(
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
      modelName: 'ViceprecidenciaEjecutiva',
      underscored: true,
      timestamps: false,
      sequelize
    }
  )
}
