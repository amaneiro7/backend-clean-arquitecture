import { type DevicesApiResponse } from "../../modules/shared/domain/types/responseTypes";

export type ClearDataset = {
    id: string
    Usuario: string
    "Ubicación": string
    "Dirección IP": string
    Serial: string
    Activo: string
    Estatus: string
    Categoria: string
    Marca: string
    Modelo: string
    "Nombre de Equipo": string
    Procesador: string
    "Memoria Ram Total": number
    "Slot de Memoria Ram": string
    "Tipo de Memoria Ram": string
    "Disco Duro Total": string
    "Tipo de Disco Duro": string
    "Sistema Operativo": string
    "Arquitectura": string
    Observación: string
    "Fecha de Modificación": string
}

export function clearComputerDataset({ devices }: { devices: DevicesApiResponse[] }): ClearDataset[] {
    console.log('Entrada', devices)
    return devices.map(device => ({
        id: device?.id,
        Usuario: device?.employee?.userName ?? 'Sin Asignar',
        "Ubicación": device?.location?.name,
        "Dirección IP": device?.computer?.ipAddress ?? '',
        Serial: device?.serial ?? 'Sin Serial',
        Activo: device?.activo ?? 'Sin Activo',
        Estatus: device?.status?.name,
        Categoria: device?.category?.name,
        Marca: device?.brand?.name,
        Modelo: device?.model?.name,
        "Nombre de Equipo": device?.computer?.computerName ?? '',
        Procesador: device?.computer.processor?.name ?? 'Sin Procesador',
        "Memoria Ram Total": device?.computer?.memoryRamCapacity,
        "Slot de Memoria Ram": device?.computer?.memoryRam.map(mem => mem).join("_"),
        "Tipo de Memoria Ram": device?.model?.modelComputer ? device?.model?.modelComputer?.memoryRamType?.name : device?.model.modelLaptop ? device?.model?.modelLaptop?.memoryRamType?.name : null,
        "Disco Duro Total": device?.computer?.hardDriveCapacity?.name ?? '',
        "Tipo de Disco Duro": device?.computer?.hardDriveType?.name ?? '',
        "Sistema Operativo": device?.computer?.operatingSystem?.name ?? '',
        "Arquitectura": device?.computer?.operatingSystemArq?.name ?? '',
        Observación: device?.observation,
        "Fecha de Modificación": device?.updatedAt
    }))
}