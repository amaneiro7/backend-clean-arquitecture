import { utils, writeFileXLSX  }  from 'xlsx'
import { forwardRef } from 'react'
import Button from '.'

export const DownloadTable = forwardRef(function (_, ref) {
    return (
        <Button
            type='button'
            actionType='SAVE'
            text='Export Excel'
            handle={() => exportToExcel(ref)}
        />
    )
})

function exportToExcel(tableData): void {
    const worksheet = utils.table_to_sheet(tableData)
    const workbook = utils.book_new()
    workbook.Props = {
        Title: 'Inventario',
        Subject: 'Inventario', 
        Author: 'Inventarios', 
        Company: 'Banco Nacional de Credito'        
    }
    worksheet["!cols"] = [ { wch: 20 } ]; // set column A width to 10 characters
    utils.book_append_sheet(workbook, worksheet, 'Inventario')
    const now = new Date()
    const filename = `Reporte-Inventario${now.toLocaleString().replace(/[/:]/g, '-')}.xlsx`
    writeFileXLSX(workbook, filename, { compression: true })
}