import * as XLSX from 'xlsx';
import { Request, Response } from 'express';
import { SomeModel } from './models/SomeModel';  // Cambia esto por tu modelo real de Sequelize
import { Repository } from '../../../Shared/domain/Repository';
import { SearchByCriteriaQuery } from '../../../Shared/domain/SearchByCriteriaQuery';
import { DeviceByCriteriaSearcher } from './DeviceByCriteriaSearcher';

export class DeviceExcelService {
    constructor(private readonly repository: Repository) { }
    async generateExcel(query: SearchByCriteriaQuery): Promise<void> {

        // Recuperar los datos de la base de datos usando Sequelize
        const search = new DeviceByCriteriaSearcher(this.repository).search
        const data = await search(query)

        // Convertir los datos a formato JSON
        const jsonData = data.map(item => item.toJSON());

        // Crear una nueva hoja de cálculo
        const worksheet = XLSX.utils.json_to_sheet(jsonData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

        // Generar un archivo buffer
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });

        // Establecer los encabezados para la descarga del archivo
        res.setHeader('Content-Disposition', 'attachment; filename=report.xlsx');
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');

    }
}
