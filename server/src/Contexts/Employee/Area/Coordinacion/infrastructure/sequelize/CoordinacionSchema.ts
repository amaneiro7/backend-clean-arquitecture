import { DataTypes, Model, type Sequelize } from 'sequelize'
import { type Primitives } from '../../../../../Shared/domain/value-object/Primitives'
import { type CoordinacionId } from '../../domain/CoordinacionId'
import { type CoordinacionName } from '../../domain/CoordinacionName'
import { type CoordinacionPrimitives } from '../../domain/Coordinacion'
import { type Models } from '../../../../../Shared/infrastructure/persistance/Sequelize/SequelizeRepository'
import { type GerenciaId } from '../../../Gerencia/domain/GerenciaId'

export class CoordinacionModel extends Model<CoordinacionPrimitives> implements CoordinacionPrimitives {
  readonly id!: Primitives<CoordinacionId>
  readonly gerenciaId!: Primitives<GerenciaId>
  readonly name!: Primitives<CoordinacionName>

  public static associate (models: Models): void {
    this.belongsTo(models.Gerencia, { as: 'gerencia', foreignKey: 'gerenciaId' }) // A Coordinacion belongs to Many Gerencias
    // this.hasMany(models.Employee, { as: 'employees', foreignKey: 'coordinacionId' }) // A Coordinacion has Many employees
  }
}

export function initCoordinacionModel (sequelize: Sequelize): void {
  CoordinacionModel.init(
    {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true
      },
      gerenciaId: {
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
      modelName: 'Coordinacion',
      underscored: true,
      timestamps: false,
      sequelize
    }
  )
}
