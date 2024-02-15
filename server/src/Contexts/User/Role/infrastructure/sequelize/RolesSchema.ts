import { DataTypes, Model, type Sequelize } from 'sequelize'
import { type RolePrimitives } from '../../domain/Role'

export class RolesModel extends Model<RolePrimitives> implements RolePrimitives {
  readonly id!: number
  readonly name!: string
}

export function initRolesodel (sequelize: Sequelize): void {
  RolesModel.init(
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
      modelName: 'Role',
      tableName: 'role',
      timestamps: false,
      underscored: true,
      sequelize
    }
  )
}
