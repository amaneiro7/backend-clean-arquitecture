import { lazy, memo } from "react"
import { CategorySelected } from "./ModelTable"

const Table = lazy(async () => import("../../components/TableComponent/Table2"))
const TableHeader = lazy(async () => import("../../components/TableComponent/TableHeader"))
const TableRow = lazy(async () => import("../../components/TableComponent/TableRow"))
const TableBody = lazy(async () => import("../../components/TableComponent/TableBody"))
const TableHead = lazy(async () => import("../../components/TableComponent/TableHead"))

export const TableWraper = memo(({ 
  children, 
  style, 
  categorySelected: {
    isComputer,
    isKeyboard,
    isLaptop,
    isMonitor,
    isPrinter
  }
}: { 
  children: React.ReactNode 
  style: React.CSSProperties,
  categorySelected: CategorySelected
}) => (
  <Table>            
    <TableHeader>        
      <TableRow>
        <TableHead style={{ width: '144px' }} size='min-w-36' name='Acciones' />
        <TableHead style={{ width: '144px' }} size='min-w-36' name='Categoria' />
        <TableHead style={{ width: '192px' }} size='min-w-48' name='Marca' />
        <TableHead style={{ width: '80px' }} size='min-w-20' name='Modelo' />
        {!(isMonitor || isPrinter || isKeyboard) && <TableHead style={{ width: '80px' }} size='min-w-20' name='Tipo de Memoria' />}
        {!(isMonitor || isPrinter || isKeyboard) && <TableHead style={{ width: '80px' }} size='min-w-20' name='Cantidad de Ranuras' />}
        {!(isPrinter || isKeyboard) && <TableHead style={{ width: '80px' }} size='min-w-20' name='Puerto VGA' />}
        {!(isPrinter || isKeyboard) && <TableHead style={{ width: '80px' }} size='min-w-20' name='Puerto DVI' />}
        {!(isPrinter || isKeyboard) && <TableHead style={{ width: '80px' }} size='min-w-20' name='Puerto HDMI' />}
        {!(isMonitor || isPrinter || isKeyboard) && <TableHead style={{ width: '80px' }} size='min-w-20' name='Adaptador Bluetooth' />}
        {!(isMonitor || isPrinter || isKeyboard) && <TableHead style={{ width: '80px' }} size='min-w-20' name='Adaptador Wifi' />}
        {!(isComputer || isMonitor || isPrinter || isKeyboard) && <TableHead style={{ width: '80px' }} size='min-w-20' name='Modelo de bateria' />}
        {!(isComputer || isLaptop || isPrinter || isKeyboard) && <TableHead style={{ width: '80px' }} size='min-w-20' name='Tamaño de Pantalla' />}
        {!(isComputer || isLaptop || isMonitor || isKeyboard) && <TableHead style={{ width: '80px' }} size='min-w-20' name='Modelo de cartucho' />}
        {!(isComputer || isLaptop || isMonitor || isPrinter) && <TableHead style={{ width: '80px' }} size='min-w-20' name='Tipo de entrada' />}
        {!(isComputer || isLaptop || isMonitor || isPrinter) && <TableHead style={{ width: '80px' }} size='min-w-20' name='Lector de huella' />}
      </TableRow>
          
    </TableHeader>            
    <TableBody className='relative' style={style}>
      {children}
    </TableBody>      
  </Table>    
    ))