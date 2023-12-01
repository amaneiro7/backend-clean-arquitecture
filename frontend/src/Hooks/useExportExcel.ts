import XLSX from 'xlsx'

export const useExportToExcel = (tableData: React.MutableRefObject<null>) => {
  const ws = XLSX.utils.table_to_sheet(tableData)
  const wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1')
  const now = new Date()
  const filename = `inventoryAPP${now.toLocaleString().replace(/[/:]/g, '-')}.xlsx`
  XLSX.writeFile(wb, filename)
}
