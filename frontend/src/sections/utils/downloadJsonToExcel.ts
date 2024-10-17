import { read, utils, writeFile } from 'xlsx'
import { type ClearModelDataset, type ClearDataset } from '../../types/types'

export async function jsonToExcel({ clearDataset }: { clearDataset: ClearDataset[] | ClearModelDataset[] }) {
    // const worksheet = utils.json_to_sheet(clearDataset)
    // worksheet["!cols"] = [{ wch: 20 }]
    // const workbook = utils.book_new()
    // utils.book_append_sheet(workbook, worksheet, 'Inventario')
    // const now = new Date()
    // const filename = `Reporte-Inventario${now.toLocaleString().replace(/[/:]/g, '-')}.xlsx`
    // writeFile(workbook, filename, { compression: true })
    const res = await fetch('http://localhost:5000/api/v1/devices/computers/download', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/vnc.ms-excel'
        },
        credentials: 'include'
    })
        .then(res => {
            if (res.ok) {
                return res.blob() // convert the response to a blob
            }
            throw new Error('Network response was not ok')
        })
        .then(blob => {
            const url = window.URL.createObjectURL(blob)
            const a = document.createElement('a')
            a.href = url
            a.download = 'Inventario.xlsx'
            document.body.appendChild(a)
            a.click()
            a.remove()
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation: ', error)
        })
    console.log(res)
    return res
}