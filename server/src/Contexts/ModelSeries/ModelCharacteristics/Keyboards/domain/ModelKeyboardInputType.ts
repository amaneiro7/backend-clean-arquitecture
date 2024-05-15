import { Primitives } from "../../../../Shared/domain/value-object/Primitives"
import { InputTypePrimitives } from "../../../InputType/domain/InputType"
import { InputTypeId } from "../../../InputType/domain/InputTypeId"
import { InputTypeRepository } from "../../../InputType/domain/InputTypeRepository"
import { KeyboardModels } from "./KeyboadModels"

export class ModelKeyboardInputType extends InputTypeId {
    static async updateInputTypeField(params: { repository: InputTypeRepository, inputTypeId: Primitives<InputTypeId>, entity: KeyboardModels }): Promise<void> {
        // Si no se ha pasado un nuevo valor de categoria no realiza ninguna acción
        if (params.inputTypeId === undefined) {
            return
        }
        // Verifica que si la categoria actual y el nuevo valor de categoria son iguales no realice una busqueda en el repositorio
        if (params.entity.inputTypeValue === params.inputTypeId) {
            return
        }
        // Verifica que la categoria no exista en la base de datos, si existe lanza un error {@link BrandAlreadyExistError} con el valor de categoria
        await ModelKeyboardInputType.ensureInputTypeExist({ repository: params.repository, inputTypeId: params.inputTypeId })
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