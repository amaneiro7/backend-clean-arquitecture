import { Primitives } from "../../../../shared/domain/value-object/Primitives";
import { StatusId } from "../../../devices/status/domain/StatusId";
import { MemoryRamValues } from "../../memoryRam/memoryRamCapacity/domain/MemoryRamValue";

export class MemoryRam {
    constructor(
        readonly value: MemoryRamValues[],
        private readonly status: Primitives<StatusId>
    ) {
        if (MemoryRam.isValid(value, this.status)) {
            throw new Error(MemoryRam.invalidMessage())
        }
    }

    public static isValid(value: Primitives<MemoryRam>, status: Primitives<StatusId>): boolean {
        return StatusId.StatusOptions.INUSE === status && MemoryRam.isZeroTotalMemory(value) && this.isEmpty(value)
    }

    public static invalidMessage(): string {
        return 'La capacidad de la memoria Ram no puede ser 0 si el equipo está en uso'

    }

    private static isEmpty(value: Primitives<MemoryRam>): boolean {
        return value.length === 0
    }

    private static totalAmount(value: Primitives<MemoryRam>): number {
        let number = 0
        for (let totalAmount = 0; totalAmount < value.length; totalAmount++) {
            number += value[totalAmount].value
        }
        return number
    }

    public static isZeroTotalMemory(value: Primitives<MemoryRam>): boolean {
        return this.totalAmount(value) === 0
    }
}