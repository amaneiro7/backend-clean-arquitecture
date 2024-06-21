import { utils, writeFile } from 'xlsx'
import { ClearDataset } from './clearComputerDataset'

export function jsonToExcel({ clearDataset }: { clearDataset: ClearDataset[] }) {
    const worksheet = utils.json_to_sheet(clearDataset)
    worksheet["!cols"] = [{ wch: 20 }]
    const workbook = utils.book_new()
    utils.book_append_sheet(workbook, worksheet, 'Inventario')
    const now = new Date()
    const filename = `Reporte-Inventario${now.toLocaleString().replace(/[/:]/g, '-')}.xlsx`
    writeFile(workbook, filename, { compression: true })
}