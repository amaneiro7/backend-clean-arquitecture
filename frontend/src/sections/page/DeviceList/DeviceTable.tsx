import { lazy, Suspense, useRef } from 'react'
import { type DevicesApiResponse } from '../../../modules/shared/domain/types/responseTypes'
import { type DevicePrimitives } from '../../../modules/devices/devices/devices/domain/Device'
import { type OnHandleChange } from '../../../modules/shared/domain/types/types'
import { type InputData } from './useInputData'
import TableSkeleton from '../../components/skeleton/TableSkeleton'

const Table = lazy(async () => import('../../components/TableComponent/Table'))
const TableHeader = lazy(async () => import('../../components/TableComponent/TableHeader'))
const TableRow = lazy(async () => import('../../components/TableComponent/TableRow'))
const TableBody = lazy(async () => import('../../components/TableComponent/TableBody'))
const TableHead = lazy(async () => import('../../components/TableComponent/TableHead'))
const TableCell = lazy(async () => import('../../components/TableComponent/TableCell'))
const TableCellEditDeleteIcon = lazy(async () => import('../../components/TableComponent/TableCellEditDeleteIcon'))
const TypeOfSiteTabNav = lazy(async () => import('../../components/tabs/TypeOfSiteTabNav').then(m => ({ default: m.TypeOfSiteTabNav })))
interface Props {
    devices: DevicePrimitives[]
    onChange: OnHandleChange
    inputData: InputData
    loading: boolean
}
export function DeviceTable({ devices, loading, onChange, inputData }: Props) {
    const tableRef = useRef(null)
    return (
        <Suspense fallback={<TableSkeleton />}>
            <Table
                className=''
                ref={tableRef}
                tabs={<Suspense><TypeOfSiteTabNav onChange={onChange} value={inputData.typeOfSiteId} /></Suspense>}>
                <Suspense>
                    <TableHeader className='bg-secondary text-white'>
                        <Suspense>
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
                </Suspense>
                <Suspense>
                    <TableBody>
                        {(devices as unknown as DevicesApiResponse[]).map((device) => (
                            <Suspense>
                                <TableRow totalTd={19} loading={loading} key={device?.id}>
                                    <TableCellEditDeleteIcon state={device} url={`/device/edit/${device.id}`} />
                                    <TableCell value={device.employee?.userName} url={`/employee/edit/${device.employeeId}`} />
                                    <TableCell value={device.location?.name} />
                                    <TableCell value={device?.computer?.ipAddress} />
                                    <TableCell value={device.serial ?? 'Sin Serial'} state={device} url={`/device/edit/${device.id}`} />
                                    <TableCell value={device.status?.name} />
                                    <TableCell value={device.category?.name} />
                                    <TableCell value={device.brand?.name} />
                                    <TableCell value={device.model?.name} />
                                    <TableCell value={device?.computer?.computerName} />
                                    <TableCell value={device?.computer ? `${device?.computer?.processor?.productCollection} ${device?.computer?.processor?.numberModel}` : ''} />
                                    <TableCell value={device?.computer ? `${device?.computer?.memoryRamCapacity} Gb` : ''} />
                                    <TableCell value={device?.computer ? device?.computer?.memoryRam.map(mem => mem).join(' / ') : ''} />
                                    <TableCell value={device?.model?.modelComputer ? device?.model?.modelComputer.memoryRamType?.name : device?.model?.modelLaptop ? device?.model?.modelLaptop?.memoryRamType?.name : ''} />
                                    <TableCell value={device?.computer ? `${device?.computer?.hardDriveCapacity?.name} Gb` : ''} />
                                    <TableCell value={device?.computer?.hardDriveType?.name} />
                                    <TableCell value={device?.computer?.operatingSystem?.name} />
                                    <TableCell value={device?.computer?.operatingSystemArq?.name} />
                                    <TableCell value={device.observation} />
                                </TableRow>
                            </Suspense>
                        ))}
                    </TableBody>
                </Suspense>
            </Table>
        </Suspense>
    )
}