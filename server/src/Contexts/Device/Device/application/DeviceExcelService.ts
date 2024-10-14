import { utils, writeFileXLSX } from 'xlsx'
import { type DevicesApiResponse } from '../infrastructure/sequelize/DeviceResponse'
import { type Repository } from '../../../Shared/domain/Repository'
import { SearchByCriteriaQuery } from '../../../Shared/domain/SearchByCriteriaQuery'
import { lastHistoryUpdated } from '../../../Shared/domain/LastHistoryUpdated'
import { Criteria } from '../../../Shared/domain/criteria/Criteria'
import { Filters } from '../../../Shared/domain/criteria/Filters'
import { Order } from '../../../Shared/domain/criteria/Order'
import { Filter } from '../../../Shared/domain/criteria/Filter'
import { FilterField } from '../../../Shared/domain/criteria/FilterField'
import { FilterValue } from '../../../Shared/domain/criteria/FilterValue'
import { FilterOperator } from '../../../Shared/domain/criteria/FilterOperator'

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
        const filters = query.filters.map((filter) => {
            return new Filter(
                new FilterField(filter.field),
                FilterOperator.fromValue(filter.operator),
                new FilterValue(filter.value))
        })
        const order = Order.fromValues(
            query.orderBy ?? 'locationId',
            query.orderType
        )
        const criteria = new Criteria(new Filters(filters), order)
        criteria.searchValueInArray('categoryId')
        const data = await this.repository.device.matching(criteria)

        // Crear una nueva hoja de cálculo
        const worksheet = utils.json_to_sheet(data)
        worksheet["!cols"] = [{ wch: 20 }]
        const workbook = utils.book_new()
        utils.book_append_sheet(workbook, worksheet, 'Inventario')

        // Generar un archivo buffer
        const now = new Date()
        const filename = `Reporte-Inventario${now.toLocaleString().replace(/[/:]/g, '-')}.xlsx`
        const excelBuffer = writeFileXLSX(workbook, filename, { compression: true })

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
