import { DataTypes, Model, type Sequelize } from 'sequelize'
import { type Primitives } from '../../../../../Shared/domain/value-object/Primitives'
import { type GerenciaId } from '../../domain/GerenciaId'
import { type GerenciaName } from '../../domain/GerenciaName'
import { type GerenciaPrimitives } from '../../domain/Gerencia'
import { type Models } from '../../../../../Shared/infrastructure/persistance/Sequelize/SequelizeRepository'
import { type VicepresidenciaId } from '../../../VicePresidencia/domain/vicepresidenciaId'

export class GerenciaModel extends Model<GerenciaPrimitives> implements GerenciaPrimitives {
  readonly id!: Primitives<GerenciaId>
  readonly vicepresidenciaId!: Primitives<VicepresidenciaId>
  readonly name!: Primitives<GerenciaName>

  public static associate (models: Models): void {
    this.belongsTo(models.Vicepresidencia, { as: 'vicepresidencia', foreignKey: 'gerenciaId' }) // A Gerencia belongs to Many Vicepresidencias
    this.hasMany(models.Coordinacion, { as: 'coordinacion', foreignKey: 'coordinacionId' }) // A Gerencia has Many Coordinaciones
    this.hasMany(models.Employee, { as: 'employees', foreignKey: 'cargoId' }) // A Gerencia has Many employees
  }
}

export function initGerenciaModel (sequelize: Sequelize): void {
  GerenciaModel.init(
    {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true
      },
      vicepresidenciaId: {
        type: DataTypes.UUID,
        allowNull: false
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      }
    },
    {
      modelName: 'Gerencia',
      underscored: true,
      timestamps: false,
      sequelize
    }
  )
}
