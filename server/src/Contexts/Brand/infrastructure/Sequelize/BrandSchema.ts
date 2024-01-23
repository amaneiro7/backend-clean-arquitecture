import { DataTypes, Model, type Optional, type Sequelize } from 'sequelize'
import { type BrandPrimitives, type Brand } from '../../domain/Brand'
import { type BrandId } from '../../domain/BrandId'
import { type BrandName } from '../../domain/BrandName'

export interface BrandCreationAttributes extends Optional<BrandPrimitives, 'id'> {}
export class BrandModel extends Model<Brand, BrandCreationAttributes> implements Brand {
  public id!: BrandId
  public name!: BrandName
  public static initialize (sequelize: Sequelize): void {
    BrandModel.init(
      {
        id: {
          type: DataTypes.UUIDV4,
          primaryKey: true,
          allowNull: false
        },
        name: {
          allowNull: false,
          type: DataTypes.STRING,
          unique: true
        }
      },
      {
        tableName: 'brands',
        modelName: 'Brand',
        timestamps: true,
        updatedAt: true,
        sequelize
      }
    )
  }

  public toPrimitive (): BrandPrimitives {
    return {
      id: this.id.value,
      name: this.name.value
    }
  }

  public get idValue (): string {
    return this.id.value
  }

  public get nameValue (): string {
    return this.name.value
  }
}
