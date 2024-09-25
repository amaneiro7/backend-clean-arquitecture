import { InputTypeId } from "../../../InputType/domain/InputTypeId"
import { type InputTypePrimitives } from "../../../InputType/domain/InputType"
import { type MouseModels } from "./MouseModels"
import { type Primitives } from "../../../../Shared/domain/value-object/Primitives"
import { type InputTypeRepository } from "../../../InputType/domain/InputTypeRepository"

export class ModelMouseInputType extends InputTypeId {
    static async updateInputTypeField(params: { repository: InputTypeRepository, inputTypeId: Primitives<InputTypeId>, entity: MouseModels }): Promise<void> {
        // Si no se ha pasado un nuevo valor de categoria no realiza ninguna acción
        if (params.inputTypeId === undefined) {
            return
        }
        // Verifica que si la categoria actual y el nuevo valor de categoria son iguales no realice una busqueda en el repositorio
        if (params.entity.inputTypeValue === params.inputTypeId) {
            return
        }
        // Verifica que la categoria no exista en la base de datos, si existe lanza un error {@link BrandAlreadyExistError} con el valor de categoria
        await ModelMouseInputType.ensureInputTypeExist({ repository: params.repository, inputTypeId: params.inputTypeId })
        // Actualiza el campo Brand de la entidad {@link ModelSeries} con el nuevo valor de categoria
        params.entity.updateInputType(params.inputTypeId)
    }
    static async ensureInputTypeExist(params: { repository: InputTypeRepository, inputTypeId: Primitives<InputTypeId> }): Promise<void> {
        const isInputTypeExist: InputTypePrimitives | null = await params.repository.searchById(params.inputTypeId)
        if (isInputTypeExist === null) {
            throw new Error('InputType does not exist')
        }
    }
}