import { lazy, memo } from "react"

const Table = lazy(async () => import("../../components/TableComponent/Table2"))
const TableHeader = lazy(async () => import("../../components/TableComponent/TableHeader"))
const TableRow = lazy(async () => import("../../components/TableComponent/TableRow"))
const TableBody = lazy(async () => import("../../components/TableComponent/TableBody"))
const TableHead = lazy(async () => import("../../components/TableComponent/TableHead"))

export const TablerWraper = memo(({children, style}: {style: React.CSSProperties,children: React.ReactNode}) => (      
  <Table>            
    <TableHeader>        
      <TableRow>
        <TableHead size='min-w-20' name='Acciones' />
        <TableHead size='min-w-28' name='Usuario' />
        <TableHead size='min-w-52' name='Ubicación' />
        <TableHead size='min-w-24' name='Dirección IP' />
        <TableHead size='min-w-32' name='Serial' />
        <TableHead size='min-w-20' name='Estado' />
        <TableHead size='min-w-28' name='Categoria' />
        <TableHead size='min-w-32' name='Marca' />
        <TableHead size='min-w-52' name='Modelo' />
        <TableHead size='min-w-52' name='Nombre de Equipo' />
        <TableHead size='min-w-52' name='Procesador' />
        <TableHead size='min-w-24' name='Memoria Ram' />
        <TableHead size='min-w-24' name='Modulos' />
        <TableHead size='min-w-32' name='Tipo' />
        <TableHead size='min-w-20' name='Disco Duro' />
        <TableHead size='min-w-20' name='Tipo' />
        <TableHead size='min-w-32' name='Sistema Operativo' />
        <TableHead size='min-w-32' name='Arquitectura' />
        <TableHead size='min-w-52' name='Observaciones' />
      </TableRow>
          
    </TableHeader>            
    <TableBody className='relative' style={style}>
      {children}
    </TableBody>      
  </Table>    
    ))