import { Primitives } from "../../../Shared/domain/value-object/Primitives";
import { MemoryRamValues } from "../../MemoryRam/MemoryRamCapacity/MemoryRamValues";
import { DeviceComputer } from "./Computer";

export class ComputerMemoryRam {
    constructor(readonly value: MemoryRamValues[]) {}    

    isEmpty(): boolean {
        return this.value.length === 0
    }

    static totalAmount(value: Primitives<ComputerMemoryRam>): number {
        let number = 0
        for (let totalAmount = 0; totalAmount < value.length; totalAmount++) {
            number += value[totalAmount].value
        }
        return number
    }

    isZeroTotalMemory(): boolean {
        return ComputerMemoryRam.totalAmount(this.value) === 0
    }

    static async updateMemoryRam ({ memoryRam, entity }: { memoryRam?: Primitives<ComputerMemoryRam>, entity: DeviceComputer }): Promise<void>{
        if (memoryRam === undefined) {
            return
        }
        if (JSON.stringify(entity.memoryRamValue) === JSON.stringify(memoryRam)) {
            return
        }
        entity.updateMemoryRam(memoryRam)
        const status = entity.statusValue
        const newMemRamValue = ComputerMemoryRam.totalAmount(memoryRam)
        entity.updateMemoryRamCapacity(newMemRamValue, status)
    }
}