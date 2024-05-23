export class LocationName {
    static readonly NAME_MIN_LENGTH = 3
    static readonly NAME_MAX_LENGTH = 100
    static readonly regex = /^[a-zA-Z0-9()\-,\s]*$/

    private static error: string = ''

    constructor(readonly value: string) {
        if (!LocationName.isValid(value)) {
            throw new Error(LocationName.invalidMessage())
        }
    }

    public static isValid(value: string): boolean {
        const errors: string[] = []
        const validFormat = LocationName.regex.test(value)
        if (!validFormat) {
            errors.push('La cadena de texto solo puede contener letras mayúsculas, minúsculas, números y los caracteres especiales ()-,.')
        }
        const validLength = value.length >= LocationName.NAME_MIN_LENGTH && value.length <= LocationName.NAME_MAX_LENGTH
        if (!validLength) {
             errors.push(`${value} no es un nombre válido. Debe tener entre ${LocationName.NAME_MIN_LENGTH} y ${LocationName.NAME_MAX_LENGTH} caracteres`)
        }
        if (validFormat && validLength) {
            return true
        } else {
            LocationName.error = errors.join(' ')
            return false
        }        
    }

    public static invalidMessage(): string {
        return LocationName.error
    }
}
