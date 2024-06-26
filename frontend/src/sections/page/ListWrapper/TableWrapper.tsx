import { lazy, memo } from "react"

const Table = lazy(async () => import("../../components/TableComponent/Table2"))
const TableHeader = lazy(async () => import("../../components/TableComponent/TableHeader"))
const TableRow = lazy(async () => import("../../components/TableComponent/TableRow"))
const TableBody = lazy(async () => import("../../components/TableComponent/TableBody"))
const TableHead = lazy(async () => import("../../components/TableComponent/TableHead"))

export const TableWraper = memo(({children, style}: {style: React.CSSProperties,children: React.ReactNode}) => (      
  <Table>            
    <TableHeader>        
      <TableRow>
        <TableHead style={{ width: '80px' }} size='min-w-20' name='Acciones' />
        <TableHead style={{ width: '112px' }} size='min-w-28' name='Usuario' />
        <TableHead style={{ width: '240px' }} size='min-w-60' name='Ubicación' />
        <TableHead style={{ width: '144px' }} size='min-w-36' name='Serial' />
        <TableHead style={{ width: '112px' }} size='min-w-28' name='Estado' />
        <TableHead style={{ width: '144px' }} size='min-w-36' name='Categoria' />
        <TableHead style={{ width: '144px' }} size='min-w-36' name='Marca' />
        <TableHead style={{ width: '192px' }} size='min-w-48' name='Modelo' />                
        <TableHead style={{minWidth: '100%'}} name='Observaciones' />
      </TableRow>
          
    </TableHeader>            
    <TableBody className='relative' style={style}>
      {children}
    </TableBody>      
  </Table>    
    ))