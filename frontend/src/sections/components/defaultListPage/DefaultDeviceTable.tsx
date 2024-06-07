import { forwardRef, lazy, Suspense } from "react"
import { type DevicesApiResponse } from "../../../modules/shared/domain/types/responseTypes"
import { type DevicePrimitives } from "../../../modules/devices/devices/devices/domain/Device"
import TableSkeleton from "../skeleton/TableSkeleton"

const Table = lazy(async () => import("../TableComponent/Table"))
const TableHeader = lazy(async () => import("../TableComponent/TableHeader"))
const TableRow = lazy(async () => import("../TableComponent/TableRow"))
const TableBody = lazy(async () => import("../TableComponent/TableBody"))
const TableHead = lazy(async () => import("../TableComponent/TableHead"))
const TableCell = lazy(async () => import("../TableComponent/TableCell"))
const TableCellEditDeleteIcon = lazy(async () => import("../TableComponent/TableCellEditDeleteIcon"))

interface Props {
  devices: DevicePrimitives[]
  loading: boolean
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const DeviceTable = forwardRef(({ devices, loading }: Props, ref: React.MutableRefObject<any>) => {
  return (
    <>      
      <Suspense fallback={<TableSkeleton />}>
        <Table className='' ref={ref}>
          <Suspense>
            <TableHeader className='bg-secondary text-white'>
              <Suspense>
                <TableRow>
                  <TableHead name='Acciones' />
                  <TableHead name='Usuario' />
                  <TableHead name='Ubicación' />
                  <TableHead name='Serial' />
                  <TableHead name='Estado' />
                  <TableHead name='Categoria' />
                  <TableHead name='Marca' />
                  <TableHead name='Modelo' />
                  <TableHead name='Observaciones' />
                </TableRow>
              </Suspense>
            </TableHeader>
          </Suspense>
          <Suspense>
            <TableBody>
              {(devices as unknown as DevicesApiResponse[]).map((device) => (
                <Suspense key={device?.id} fallback={<div className='h-6 animate-pulse bg-slate-200' />}>
                  <TableRow totalTd={9} loading={loading}>
                    <TableCellEditDeleteIcon stateId={device.id} state={device} url={`/device/edit/${device.id}`} />                    
                    <TableCell value={device.employee?.userName} url={`/employee/edit/${device.employeeId}`} />
                    <TableCell value={device.location?.name} />
                    <TableCell value={device.serial ?? 'Sin Serial'} state={device} url={`/device/edit/${device.id}`} />
                    <TableCell value={device.status?.name} />
                    <TableCell value={device.category?.name} />
                    <TableCell value={device.brand?.name} />
                    <TableCell value={device.model?.name} />
                    <TableCell value={device.observation} />
                  </TableRow>
                </Suspense>
              ))}
            </TableBody>
          </Suspense>
        </Table>
      </Suspense>
      {(!loading && devices.length === 0) && <p>No hay resultados que coincidan con el filtro</p>}
    </>
  )
})
