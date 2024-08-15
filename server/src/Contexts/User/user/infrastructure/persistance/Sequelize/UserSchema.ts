import { DataTypes, Model, type Sequelize } from 'sequelize'
import { type UserPrimitives } from '../../../domain/User'
import { type Models } from '../../../../../Shared/infrastructure/persistance/Sequelize/SequelizeRepository'
import { Primitives } from '../../../../../Shared/domain/value-object/Primitives'
import { UserId } from '../../../domain/UserId'
import { UserEmail } from '../../../domain/UserEmail'
import { UserName } from '../../../domain/UserName'
import { RoleId } from '../../../../Role/domain/RoleId'
import { UserLastName } from '../../../domain/UserLastName'
import { UserPassword } from '../../../domain/UserPassword'

export class UserModel extends Model<UserPrimitives> implements UserPrimitives {
  readonly id!: Primitives<UserId>
  readonly email!: Primitives<UserEmail>
  readonly name!: Primitives<UserName>
  readonly roleId!: Primitives<RoleId>
  readonly lastName!: Primitives<UserLastName>
  readonly password!: Primitives<UserPassword>

  public static associate(models: Models): void {
    this.belongsTo(models.Role, { as: 'role', foreignKey: 'roleId' }) // A user belongs to a role
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
      deletedAt: true,
      paranoid: true,
      timestamps: true,
      underscored: true,
      sequelize
    }
  )
}
