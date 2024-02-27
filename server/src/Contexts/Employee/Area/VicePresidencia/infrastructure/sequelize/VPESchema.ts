import { DataTypes, Model, type Sequelize } from 'sequelize'
import { type VicepresidenciaEjecutivaPrimitives } from '../../domain/vicepresidencia'
import { type Primitives } from '../../../../../Shared/domain/value-object/Primitives'
import { type VPEId } from '../../domain/vicepresidenciaId'
import { type VPEName } from '../../domain/vicepresidenciaName'

export class VPEModel extends Model<VicepresidenciaEjecutivaPrimitives> implements VicepresidenciaEjecutivaPrimitives {
  readonly id!: Primitives<VPEId>
  readonly name!: Primitives<VPEName>
}

export function initVPEModel (sequelize: Sequelize): void {
  VPEModel.init(
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
      tableName: 'ViceprecidenciasEjecutivas',
      modelName: 'ViceprecidenciasEjecutiva',
      sequelize
    }
  )
}
