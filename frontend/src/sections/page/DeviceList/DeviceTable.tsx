import { forwardRef, lazy, Suspense, memo, useMemo } from "react"
import { type DevicesApiResponse } from "../../../modules/shared/domain/types/responseTypes"
import TableSkeleton from "../../components/skeleton/TableSkeleton"
import { FixedSizeList,  } from "react-window"

const Table = lazy(async () => import("../../components/TableComponent/Table2"))
const TableHeader = lazy(async () => import("../../components/TableComponent/TableHeader"))
const TableRow = lazy(async () => import("../../components/TableComponent/TableRow"))
const TableBody = lazy(async () => import("../../components/TableComponent/TableBody"))
const TableHead = lazy(async () => import("../../components/TableComponent/TableHead"))
const TableCell = lazy(async () => import("../../components/TableComponent/TableCell"))
const TableCellEditDeleteIcon = lazy(async () => import("../../components/TableComponent/TableCellEditDeleteIcon"))

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
        <FixedSizeList height={800} itemCount={devices.length} itemSize={42} width='100%' outerElementType='section' innerElementType={TableWrapper}>
          {({ index, style }) => (
            <TableRow key={index} style={style}>
              <TableCellEditDeleteIcon stateId={devices[index].id} state={devices[index]} url={`/device/edit/${devices[index].id}`} />
              <TableCell value={devices[index].employee?.userName} url={`/employee/edit/${devices[index].employeeId}`} />
              <TableCell value={devices[index].location?.name} />
              <TableCell value={devices[index]?.computer?.ipAddress} />
              <TableCell value={devices[index].serial ?? "Sin Serial"} state={devices[index]} url={`/devices[index]/edit/${devices[index].id}`} />
              <TableCell value={devices[index].status?.name} />
              <TableCell value={devices[index].category?.name} />
              <TableCell value={devices[index].brand?.name} />
              <TableCell value={devices[index].model?.name} />
              <TableCell value={devices[index]?.computer?.computerName} />
              <TableCell value={devices[index]?.computer ? `${devices[index]?.computer?.processor?.productCollection} ${devices[index]?.computer?.processor?.numberModel}` : ""} />
              <TableCell value={devices[index]?.computer ? `${devices[index]?.computer?.memoryRamCapacity} Gb` : ""} />
              <TableCell value={devices[index]?.computer ? devices[index]?.computer?.memoryRam.map((mem) => mem).join(" / ") : ""} />
              <TableCell
                value={devices[index]?.model?.modelComputer ? devices[index]?.model?.modelComputer.memoryRamType?.name : devices[index]?.model?.modelLaptop ? devices[index]?.model?.modelLaptop?.memoryRamType?.name : ""}
              />
              <TableCell value={devices[index]?.computer ? `${devices[index]?.computer?.hardDriveCapacity?.name} Gb` : ""} />
              <TableCell value={devices[index]?.computer?.hardDriveType?.name} />
              <TableCell value={devices[index]?.computer?.operatingSystem?.name} />
              <TableCell value={devices[index]?.computer?.operatingSystemArq?.name} />
              <TableCell value={devices[index].observation} />
            </TableRow>
                )}
        </FixedSizeList>
      </>
  )
})

export const DeviceTable = memo(TableRef)