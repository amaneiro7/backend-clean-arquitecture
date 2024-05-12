import { Primitives } from "../../../Shared/domain/value-object/Primitives";
import { MemoryRamValues } from "../../MemoryRam/MemoryRamCapacity/MemoryRamValues";
import { DeviceComputer } from "./Computer";

export class ComputerMemoryRam {
    constructor(readonly value: MemoryRamValues[]) {}

    public toPrimitives(): Primitives<MemoryRamValues>[] {
        return this.value.map(memValue => memValue.value)
    }
    static fromPrimitives(memoryRamValues: Primitives<MemoryRamValues>[]) {
        return new ComputerMemoryRam(memoryRamValues.map(MemoryRamValues.fromValues))
    }

    isEmpty(): boolean {
        return this.value.length === 0
    }

    static totalAmount(value: Primitives<MemoryRamValues>[]): number {
        let number = 0
        for (let totalAmount = 0; totalAmount < value.length; totalAmount++) {
            number += value[totalAmount]
        }
        console.log(value)
        return number
    }

    isZeroTotalMemory(value: Primitives<MemoryRamValues>[]): boolean {
        return ComputerMemoryRam.totalAmount(value) === 0
    }

    static async updateMemoryRam ({ memoryRam, entity }: { memoryRam?: Primitives<MemoryRamValues>[], entity: DeviceComputer }): Promise<void>{
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