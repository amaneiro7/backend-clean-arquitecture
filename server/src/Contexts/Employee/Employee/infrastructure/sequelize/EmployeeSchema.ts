import { DataTypes, Model, type Sequelize } from 'sequelize'
import { type EmployeePrimitives } from '../../domain/Employee'
import { type Models } from '../../../../Shared/infrastructure/persistance/Sequelize/SequelizeRepository'
import { type EmployeeId } from '../../domain/EmployeeId'
import { type EmployeeName } from '../../domain/EmployeeName'
import { type EmployeeLastName } from '../../domain/EmployeeLastName'
import { type EmployeeCedula } from '../../domain/EmployeeCedula'
import { type LocationId } from '../../../../Location/Location/domain/LocationId'
import { type UserEmail } from '../../../../User/user/domain/UserEmail'
import { type CargoId } from '../../../Cargo/domain/CargoId'
import { type Extension } from '../../domain/Extension'
import { type PhoneNumber } from '../../domain/PhoneNumber'
import { type VicepresidenciaEjecutivaId } from '../../../Area/VicepresidenciaEjecutiva/domain/VicepresidenciaEjecutivaId'
import { type EmployeeVicepresidenciaId } from '../../domain/EmployeeVicepresidenciaId'
import { type EmployeeGerenciaId } from '../../domain/EmployeeGerenciaId'
import { type EmployeeCoordinacionId } from '../../domain/EmployeeCoordinacionId'
import { type Primitives } from '../../../../Shared/domain/value-object/Primitives'
// import { CargoName } from '../../../Cargo/domain/CargoName'

export class EmployeeModel extends Model<EmployeePrimitives> implements EmployeePrimitives {
  public id!: Primitives<EmployeeId>
  public name!: Primitives<EmployeeName>
  public lastName!: Primitives<EmployeeLastName>
  public cedula!: Primitives<EmployeeCedula>
  public locationId!: Primitives<LocationId>
  public email!: Primitives<UserEmail>
  public cargoId!: Primitives<CargoId>
  public extension!: Primitives<Extension>
  public phoneNumber!: Primitives<PhoneNumber>
  public vicepresidenciaEjecutivaId!: Primitives<VicepresidenciaEjecutivaId>
  public vicepresidenciaId!: Primitives<EmployeeVicepresidenciaId>
  public gerenciaId!: Primitives<EmployeeGerenciaId>
  public coordinacionId!: Primitives<EmployeeCoordinacionId>

  public static associate (models: Models): void {
    this.belongsTo(models.Cargo, { as: 'cargo', foreignKey: 'cargoId' }) // An employee belongs to a cargo
    this.belongsTo(models.Location, { as: 'location', foreignKey: 'locationId' }) // An employee belongs to a location
    this.belongsTo(models.VicepresidenciaEjecutiva, { as: 'vicepresidenciaEjecutiva', foreignKey: 'vicepresidenciaEjecutivaId' }) // An employee belongs to a vicepresidencia
    this.belongsTo(models.Vicepresidencia, { as: 'vicepresidencia', foreignKey: 'vicepresidenciaId' }) // An employee belongs to a vicepresidencia
    this.belongsTo(models.Gerencia, { as: 'gerencia', foreignKey: 'gerenciaId' }) // An employee belongs to a gerencia
    this.belongsTo(models.Coordinacion, { as: 'coordinacion', foreignKey: 'coordinacionId' }) // An employee belongs to a coordinacion
    this.hasMany(models.Device, { as: 'devices', foreignKey: 'employeeId' }) // An employee has many devices
  }
}

export function initEmployeeModel (sequelize: Sequelize): void {
  EmployeeModel.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      cedula: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      locationId: {
        type: DataTypes.UUID,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: true
        }
      },
      cargoId: {
        type: DataTypes.UUID,
        allowNull: false
      },
      extension: {
        type: DataTypes.STRING,
        allowNull: false
      },
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false
      },
      vicepresidenciaEjecutivaId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      vicepresidenciaId: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      gerenciaId: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      coordinacionId: {
        type: DataTypes.INTEGER,
        allowNull: true
        // validate: {
        //   customValidator: (value: Primitives<EmployeeCoordinacionId>) => {
        //     if (value === null && EmployeeCoordinacionId.positionHigerThanCoordinator.includes(CargoName.AcceptedCargos[(this as EmployeeModel).cargoId])) {
        //       throw new Error('CoordinacionId can not be null if cargoId is higher than Coordinator')
        //     }
        //   }
        // }
      }
    },
    {
      modelName: 'Employee',
      timestamps: true,
      underscored: true,
      sequelize
    }
  )
}
