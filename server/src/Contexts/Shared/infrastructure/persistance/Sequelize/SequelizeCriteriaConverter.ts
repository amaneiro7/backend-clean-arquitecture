import { FindOptions, Op } from "sequelize"
import { Operator } from "../../../domain/criteria/FilterOperator"
import { Filter, FiltersPrimitives } from "../../../domain/criteria/Filter"
import { Criteria } from "../../../domain/criteria/Criteria"
import { Filters } from "../../../domain/criteria/Filters"
import { Order } from "../../../domain/criteria/Order"


//Una interface que provee una función anonima a la cuál tiene un parametro de tipo T y devuelve un valor de tipo K
//Esto nos servirá más adelante
interface TransformerFunction<T, K> {
    (value: T): K
}

export class SequelizeCriteriaConverter {
    private filterTransformers: Map<Operator, TransformerFunction<FiltersPrimitives, FindOptions['where']>>
    constructor() {
        //Se crea un map dónde la key es de tipo Operator, El enum generico que creamos para para nuestra clase FilterOperator
        //el valor es la función que recibe la claseFilter y el tipo SequelizeFilter
        this.filterTransformers = new Map<Operator, TransformerFunction<FiltersPrimitives, FindOptions['where']>>([
            [Operator.EQUAL, this.equalFilter], // [Operador, función]
            [Operator.NOT_EQUAL, this.notEqualFilter], // [Operador, función]
            [Operator.GT, this.greaterThanFilter],// [Operador, función]
            [Operator.LT, this.lowerThanFilter],// [Operador, función]
            [Operator.CONTAINS, this.containsFilter],// [Operador, función]
            [Operator.NOT_CONTAINS, this.notContainsFilter]// [Operador, función]
        ])
    }

    //Esta metodo es el que ejecuta la conversión y arma la query de los filtros, ya que retorna el tipo SequelizeQuery
    public convert(criteria: Criteria): FindOptions {
        const query: FindOptions = {}

        if (criteria.hasFilters()) {
            query.where = this.generateFilter(criteria.filters)
        }

        if (criteria.hasOrder()) {
            query.order = [
                [criteria.order.orderBy.value, criteria.order.orderType.value]
            ]
        }

        if (criteria.limit !== undefined) {
            query.limit = criteria.limit
        }

        if (criteria.limit !== undefined && criteria.offset !== undefined) {
            query.offset = criteria.limit * (criteria.offset - 1)
        }

        return query
    }

    // Este metodo hace la conversión de nuestro operador de todos los filtros
    protected generateFilter(filters: Filters): FindOptions['where'] {
        // const filtersPrimitives = filters.toPrimitives()        
        // const group: {
        //     field: string;
        //     operator: string;
        //     value: string[];
        // }[] = filtersPrimitives.reduce((acc, { field, operator, value }) => {            
        //     // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //     // @ts-expect-error
        //     const existingField = acc.find(entry => entry.field === field)
        //     if (existingField) {
        //         // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //         // @ts-expect-error
        //         existingField.value.push(value)
        //     } else {
        //         // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //         // @ts-expect-error
        //         acc.push({ field, operator, value: [value] })
        //     }
        //     return acc
        // }, [])

        // Recorre todos los filtros a transformar
        const filter = filters.value.map(filter => {
            // A traves de lal Map obtengo la función por el tipo de operador generico pasado como parametro
            const transformer = this.filterTransformers.get(filter.operator.value) //Operador generico de la calse FilterOperator

            if (!transformer) {
                throw Error(`Unexpected operator value ${filter.operator.value}`)
            }

            // Ejecuto la función directament con el filtro
            // Esta función es una de las declaradas más abajo según corresponda el operador
            return transformer(filter.toPrimitives())
        })
        const outputData = filter.reduce((acc, item) => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            const key = Object.keys(item)[0];
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            const value = item[key];

            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            if (acc[key]) {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                acc[key][Op.or] = [...acc[key][Op.or], ...value[Op.or]];
            } else {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                acc[key] = value;
            }

            return acc;
        }, {})
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        const finalOutputData = Object.entries(outputData).map(([key, value]) => ({
            [key]: value
        }));

        return Object.assign({}, ...finalOutputData)

    }


    protected generateSort(order: Order): FindOptions['order'] {
        return [order.orderBy.value, order.orderType.isAsc() ? 'ASC' : 'DESC']

    }

    // Todos las funciones declaradas hacia abajo cumplen con el tipo credo de SequelizeFilter
    private equalFilter(filter: FiltersPrimitives): FindOptions['where'] {
        // Si intentamos pasarse un operador que no está indicado en SequelizeFilter nos dará error, en este caso el operador es $eq
        return { [filter.field]: { [Op.or]: [filter.value] } }
    }

    private notEqualFilter(filter: FiltersPrimitives): FindOptions['where'] {
        return { [filter.field]: { [Op.ne]: filter.value } }
    }

    private greaterThanFilter(filter: FiltersPrimitives): FindOptions['where'] {
        return { [filter.field]: { [Op.gt]: filter.value } }
    }

    private lowerThanFilter(filter: FiltersPrimitives): FindOptions['where'] {
        return { [filter.field]: { [Op.lt]: filter.value } }
    }

    private containsFilter(filter: FiltersPrimitives): FindOptions['where'] {
        return { [filter.field]: { [Op.iLike]: `%${filter.value}%` } }
    }

    private notContainsFilter(filter: FiltersPrimitives): FindOptions['where'] {
        return { [filter.field]: { [Op.notILike]: `%${filter.value}%` } }
    }

}