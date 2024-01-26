import { DataTypes, type InitOptions, Model, type ModelAttributes, type Sequelize } from 'sequelize'
import { type UserPrimitives } from '../../../domain/User'
import { Roles, type RoleTypes } from '../../../domain/Role'

export const UserSchema: ModelAttributes = {
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
  role: {
    allowNull: false,
    type: DataTypes.ENUM,
    values: Roles.toPrimitive()
  },
  password: {
    allowNull: false,
    type: DataTypes.STRING(64),
    validate: {
      min: 8,
      is: /^(?=.*[a-z])(?=.*[-Z])(?=.*d)(?=.*[@#$%^&*]).{8,}$/
    }
  }
}

export class UserModel extends Model<UserPrimitives> implements UserPrimitives {
  readonly id!: string
  readonly email!: string
  readonly name!: string
  readonly role!: RoleTypes
  readonly lastName!: string
  readonly password!: string

  static config (sequelize: Sequelize): InitOptions {
    return {
      tableName: 'users',
      modelName: 'User',
      timestamps: true,
      updatedAt: true,
      sequelize
    }
  }
}
