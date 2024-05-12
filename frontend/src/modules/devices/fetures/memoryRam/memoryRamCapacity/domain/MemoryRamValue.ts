import { type Primitives } from '../../../../../shared/domain/value-object/Primitives'

export class MemoryRamValues {
    static readonly min = 0
    static readonly max = 32
    static readonly numStep = 9
    static readonly minStep = this.max / Math.pow(2, this.numStep - 1)

    constructor(readonly value: number) {
        if (!MemoryRamValues.isValid(this.value)) {
            throw new Error(MemoryRamValues.invalidMessage())
        }
    }

    public static fromValues(value: Primitives<MemoryRamValues>) {
        return new MemoryRamValues(value)
    }

    static generarSecuencia(): number[] {
        const secuencia: number[] = [this.min]
        let valorActual = this.minStep
        for (let i = 0; i < this.numStep; i++) {
            secuencia.push(valorActual)
            valorActual *= 2
        }
        return secuencia
    }

    public static isValid(value: Primitives<MemoryRamValues>): boolean {
        const numberValue = Number(value)
        const secuencia = this.generarSecuencia()        
        return secuencia.includes(numberValue)
    }

    public static invalidMessage(): string {
        return 'Capacidad de Memoria Ram no válida'
    }
}
