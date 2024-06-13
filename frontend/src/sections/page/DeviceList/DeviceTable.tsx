import { forwardRef, lazy, Suspense, memo, useMemo } from "react"
import { type DevicesApiResponse } from "../../../modules/shared/domain/types/responseTypes"
import TableSkeleton from "../../components/skeleton/TableSkeleton"
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
  ({children}: {children: React.ReactNode}) => (
    <Suspense fallback={<TableSkeleton />}>
      <Table ref={ref}>            
        <TableHeader className='bg-secondary text-white'>
          <Suspense fallback={<tr className='animate-pulse h-10 odd:bg-slate-300 even:bg-slate-400' />}>
            <TableRow>
              <TableHead name='Acciones' />
              <TableHead name='Usuario' />
              <TableHead name='Ubicación' />
              <TableHead name='Dirección IP' />
              <TableHead name='Serial' />
              <TableHead name='Estado' />
              <TableHead name='Categoria' />
              <TableHead name='Marca' />
              <TableHead name='Modelo' />
              <TableHead name='Nombre de Equipo' />
              <TableHead name='Procesador' />
              <TableHead name='Memoria Ram Total' />
              <TableHead name='Memoria Ram Modulos' />
              <TableHead name='Tipo' />
              <TableHead name='Disco Duro' />
              <TableHead name='Tipo' />
              <TableHead name='Sistema Operativo' />
              <TableHead name='Arquitectura' />
              <TableHead name='Observaciones' />
            </TableRow>
          </Suspense>
        </TableHeader>            
        <TableBody>
          {children}
        </TableBody>
      </Table>
    </Suspense>
  ), [ref])
    return (
      <>        
        <FixedSizeList height={800} itemData={devices} itemCount={devices.length} itemSize={44} width='100%' outerElementType='section' innerElementType={TableWrapper}>
          {({ index }) => (
            <DeviteRowTable devices={devices} index={index} />
          )}
        </FixedSizeList>
      </>
  )
})

export const DeviceTable = memo(TableRef)