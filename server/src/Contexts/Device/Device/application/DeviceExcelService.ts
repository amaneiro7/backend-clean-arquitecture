import * as XLSX from 'xlsx'
import { type DevicesApiResponse } from '../infrastructure/sequelize/DeviceResponse'
import { type Repository } from '../../../Shared/domain/Repository'
import { SearchByCriteriaQuery } from '../../../Shared/domain/SearchByCriteriaQuery'
import { DeviceByCriteriaSearcher } from './DeviceByCriteriaSearcher'
import { lastHistoryUpdated } from '../../../Shared/domain/LastHistoryUpdated'
import { DeviceComputer } from '../../../Features/Computer/domain/Computer'

export type ClearDataset = {
    id: string
    Usuario: string
    "Ubicación": string
    "Dirección IP"?: string
    Serial: string
    Activo: string
    Estatus: string
    Categoria: string
    Marca: string
    Modelo: string
    "Nombre de Equipo"?: string
    Procesador?: string
    "Memoria Ram Total"?: number
    "Slot de Memoria Ram"?: string
    "Tipo de Memoria Ram"?: string
    "Disco Duro Total"?: string
    "Tipo de Disco Duro"?: string
    "Sistema Operativo"?: string
    "Arquitectura"?: string
    Observación: string
    "Actualizado por"?: string
    "Fecha de Modificación": string
}

export class DeviceExcelService {
    constructor(private readonly repository: Repository) { }
    async generateExcel(query: SearchByCriteriaQuery): Promise<void> {

        // Recuperar los datos de la base de datos usando Sequelize
        const search = new DeviceByCriteriaSearcher(this.repository).search
        const data = await search(query) as DevicesApiResponse[]

        DeviceComputer.isComputerCategory({ categoryId: query.filters. })

        // Convertir los datos a formato JSON
        const jsonData = data.map(item => item.toJSON())

        // Crear una nueva hoja de cálculo
        const worksheet = XLSX.utils.json_to_sheet(jsonData)
        const workbook = XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1')

        // Generar un archivo buffer
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' })

        // Establecer los encabezados para la descarga del archivo
        // res.setHeader('Content-Disposition', 'attachment filename=report.xlsx')
        // res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
    }

    clearComputerDataset({ devices }: { devices: DevicesApiResponse[] }): ClearDataset[] {
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
            Procesador: device?.computer?.processor?.name ?? 'Sin Procesador',
            "Memoria Ram Total": device?.computer?.memoryRamCapacity,
            "Slot de Memoria Ram": device?.computer?.memoryRam.map(mem => mem).join("_"),
            "Tipo de Memoria Ram": device?.model?.modelComputer ? device?.model?.modelComputer?.memoryRamType?.name : device?.model.modelLaptop ? device?.model?.modelLaptop?.memoryRamType?.name : null,
            "Disco Duro Total": device?.computer?.hardDriveCapacity?.name ?? '',
            "Tipo de Disco Duro": device?.computer?.hardDriveType?.name ?? '',
            "Sistema Operativo": device?.computer?.operatingSystem?.name ?? '',
            "Arquitectura": device?.computer?.operatingSystemArq?.name ?? '',
            Observación: device?.observation,
            "Actualizado por": lastHistoryUpdated(device?.history)?.user?.email ?? 'root',
            "Fecha de Modificación": new Date(device?.updatedAt).toUTCString()
        }))
    }
}
