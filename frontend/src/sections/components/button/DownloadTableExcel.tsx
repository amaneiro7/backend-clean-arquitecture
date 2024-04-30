import { forwardRef } from 'react'
import { DownloadTableExcel } from 'react-export-table-to-excel'
import Button from '../../ui/button'

export const DownloadTable = forwardRef(function (_, ref) {
    return (
        <DownloadTableExcel
            filename={`Reporte Inventario ${new Date().toLocaleString()}`}
            sheet='reporte'
            currentTableRef={ref}
            
        >
            <Button
                type='button' 
                actionType='SAVE'
                text='Export Excel'
            />
        </DownloadTableExcel>
    )
})