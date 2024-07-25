import { DataTypes, Model, type Sequelize } from 'sequelize'
import { type UserPrimitives } from '../../../domain/User'
import { type Models } from '../../../../../Shared/infrastructure/persistance/Sequelize/SequelizeRepository'

export class UserModel extends Model<UserPrimitives> implements UserPrimitives {
  readonly id!: string
  readonly email!: string
  readonly name!: string
  readonly roleId!: number
  readonly lastName!: string
  readonly password!: string

  public static associate(models: Models): void {
    this.belongsTo(models.Role, { as: 'role' }) // A user belongs to a role
    this.hasMany(models.History, { as: 'history', foreignKey: 'userId' }) // A user can have many history
  }
}

export function initUserModel(sequelize: Sequelize): void {
  UserModel.init(
    {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true
      },
      email: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true,
        validate: {
          isEmail: true
        }
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING
      },
      lastName: {
        allowNull: false,
        type: DataTypes.STRING
      },
      roleId: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING(64),
        // validate: {
        //   min: 8,
        //   is: /^(?=.*[a-z])(?=.*[-Z])(?=.*d)(?=.*[@#$%^&*]).{8,}$/
        // }
      }
    },
    {
      modelName: 'User',
      timestamps: true,
      underscored: true,
      sequelize
    }
  )
}
