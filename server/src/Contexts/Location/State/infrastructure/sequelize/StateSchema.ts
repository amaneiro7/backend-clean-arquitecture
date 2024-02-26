import { DataTypes, Model, type Sequelize } from 'sequelize'
import { type StatePrimitives } from '../../domain/State'

import { type Primitives } from '../../../../Shared/domain/value-object/Primitives'
import { type StateId } from '../../domain/StateId'
import { type StateName } from '../../domain/StateName'
import { type Models } from '../../../../Shared/infrastructure/persistance/Sequelize/SequelizeRepository'

export class StateModel extends Model<StatePrimitives> implements StatePrimitives {
  readonly id!: Primitives<StateId>
  readonly name!: Primitives<StateName>

  public static associate (models: Models): void {
    this.hasMany(models.City, { as: 'cities', foreignKey: 'stateId' }) // A state has many cities
  }
}

export function initStateModel (sequelize: Sequelize): void {
  StateModel.init(
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
      modelName: 'State',
      timestamps: false,
      underscored: true,
      sequelize
    }
  )
}
