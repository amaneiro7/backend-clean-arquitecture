import { DataTypes, Model, type Sequelize } from 'sequelize'
import { type RolePrimitives } from '../../domain/Role'
import { type Models } from '../../../../Shared/infrastructure/persistance/Sequelize/SequelizeRepository'
import { type Primitives } from '../../../../Shared/domain/value-object/Primitives'
import { type RoleId } from '../../domain/RoleId'
import { type RoleName } from '../../domain/RoleName'

export class RolesModel extends Model<RolePrimitives> implements RolePrimitives {
  readonly id!: Primitives<RoleId>
  readonly name!: Primitives<RoleName>

  public static associate(models: Models): void {
    this.hasMany(models.User, { as: 'user' }) // A role can have many users
  }
}

export function initRolesodel(sequelize: Sequelize): void {
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
