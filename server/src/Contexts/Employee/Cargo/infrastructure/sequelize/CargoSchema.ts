import { DataTypes, Model, type Sequelize } from 'sequelize'
import { type CargoPrimitives } from '../../domain/Cargo'
import { type Primitives } from '../../../../Shared/domain/value-object/Primitives'
import { type CargoId } from '../../domain/CargoId'
import { type CargoName } from '../../domain/CargoName'
import { type Models } from '../../../../Shared/infrastructure/persistance/Sequelize/SequelizeRepository'

export class CargoModel extends Model<CargoPrimitives> implements CargoPrimitives {
  readonly id!: Primitives<CargoId>
  readonly name!: Primitives<CargoName>

  public static associate (models: Models): void {
    this.hasMany(models.Employee, { as: 'employees', foreignKey: 'cargoId' })
  }
}

export function initCargoModel (sequelize: Sequelize): void {
  CargoModel.init({
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
  }, {
    modelName: 'Cargo',
    underscored: true,
    timestamps: false,
    sequelize
  })
}
