import { MemoryRamTypePrimitives } from "../../../../../Features/MemoryRam/MemoryRamType/domain/MemoryRamType"
import { MemoryRamTypeId } from "../../../../../Features/MemoryRam/MemoryRamType/domain/MemoryRamTypeId"
import { MemoryRamTypeRepository } from "../../../../../Features/MemoryRam/MemoryRamType/domain/MemoryRamTypeRepository"
import { Primitives } from "../../../../../Shared/domain/value-object/Primitives"
import { LaptopsModels } from "../../Laptops/domain/LaptopsModels"
import { ComputerModels } from "./ComputerModels"

export class ComputerMemoryRamType extends MemoryRamTypeId {
    static async updateInputTypeField(params: { repository: MemoryRamTypeRepository, memoryRamTypeId: Primitives<MemoryRamTypeId>, entity: ComputerModels | LaptopsModels }): Promise<void> {
        
        if (params.memoryRamTypeId === undefined) {
            return
        }
        
        if (params.entity.memoryRamTypeValue === params.memoryRamTypeId) {
            return
        }
        
        await ComputerMemoryRamType.ensureInputTypeExist({ repository: params.repository, memoryRamTypeId: params.memoryRamTypeId })
        
        params.entity.updateMemoryRamTypeId(params.memoryRamTypeId)
    }
    static async ensureInputTypeExist(params: { repository: MemoryRamTypeRepository, memoryRamTypeId: Primitives<MemoryRamTypeId> }): Promise<void> {        
        const isExist: MemoryRamTypePrimitives | null = await params.repository.searchById(params.memoryRamTypeId)
        if (isExist === null) {
            throw new Error('InputType does not exist')
        }
    }
}