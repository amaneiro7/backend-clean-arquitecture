import { EnumCriteriaValueObject } from './EnumCriteriaValueObject'

export enum OrderTypes {
  ASC = 'asc',
  DESC = 'desc'
}

// Extendemos y ahora OrderTypes pasa a ser T
export class OrderType extends EnumCriteriaValueObject<OrderTypes> {
  constructor (value: OrderTypes) {
    super(value, Object.values(OrderTypes))
  }

  // Esto es simplemente otra forma de instanciar nuestra clase
  // La usamos cuando queremos hacer logica extra en nuestra instanciación
  // En este caso nosotro queremos evaluar que el campo value sea del tipo enum OrderTypes
  public static fromValue (value: string): OrderType {
    for (const orderTypeValue of Object.values(OrderTypes)) {
      if (value === orderTypeValue.toString()) {
        return new OrderType(orderTypeValue)
      }
    }

    throw new Error(`The order type ${value} is invalid`)
  }

  // Contrato definido en EnumValueObject
  protected throwErrorForInvalidValue (value: OrderTypes): void {
    throw new Error(`The order type ${value} is invalid`)
  }
}
