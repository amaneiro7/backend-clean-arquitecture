import React, { forwardRef, lazy, memo, useMemo } from "react"
import { type DevicesApiResponse } from "../../../modules/shared/domain/types/responseTypes"
import { FixedSizeList,  } from "react-window"
import { DeviteRowTable } from "./DeviceTableRow"

const Table = lazy(async () => import("../../components/TableComponent/Table2"))
const TableHeader = lazy(async () => import("../../components/TableComponent/TableHeader"))
const TableRow = lazy(async () => import("../../components/TableComponent/TableRow"))
const TableBody = lazy(async () => import("../../components/TableComponent/TableBody"))
const TableHead = lazy(async () => import("../../components/TableComponent/TableHead"))

interface Props {
  devices: DevicesApiResponse[]
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const TableRef = forwardRef(({ devices}: Props, ref: React.Ref<HTMLTableElement>) => {
    const TableWrapper = useMemo(() =>   
  ({children, style}: {style: React.CSSProperties,children: React.ReactNode}) => (
    
    <Table ref={ref}>            
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
      <TableBody style={style}>
        {children}

      </TableBody>
      
    </Table>    
  ), [ref])
    return (
      <>        
        <FixedSizeList 
          height={1024} 
          itemData={devices} 
          itemCount={devices.length} 
          itemSize={44} 
          width='100%' 
          outerElementType='section'
          innerElementType={TableWrapper}
        >
          {DeviteRowTable}
          {/* {({ index, style }) => (
            <DeviteRowTable devices={devices} index={index} style={style} />
          )} */}
        </FixedSizeList>
      </>
  )
})

export const DeviceTable = memo(TableRef)