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
        <TableHead size='min-w-20' name='Acciones' />
        <TableHead size='min-w-28' name='Usuario' />
        <TableHead size='min-w-60' name='Ubicación' />
        <TableHead size='min-w-36' name='Serial' />
        <TableHead size='min-w-28' name='Estado' />
        <TableHead size='min-w-36' name='Categoria' />
        <TableHead size='min-w-36' name='Marca' />
        <TableHead size='min-w-48' name='Modelo' />                
        <TableHead size='min-w-60' name='Observaciones' />
      </TableRow>
          
    </TableHeader>            
    <TableBody className='relative' style={style}>
      {children}
    </TableBody>      
  </Table>    
    ))