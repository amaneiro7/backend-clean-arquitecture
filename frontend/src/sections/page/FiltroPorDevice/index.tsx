import Main from "../../components/Main"
import PageTitle from "../../components/PageTitle"
import { FilterManager } from "../../components/Filter/FilterManager"
import { useSearchDevice } from "../../Hooks/device/useSearchDevice"
import { SpinnerSKCircle } from "../../components/Loading/spinner-sk-circle"
import { lazy, Suspense, useRef } from "react"
import TableHeader from "../../components/TableComponent/TableHeader"
import TableHead from "../../components/TableComponent/TableHead"
import { type DevicesApiResponse } from "../../../modules/shared/domain/types/responseTypes"
import Table from "../../components/TableComponent/Table"
import TableRow from "../../components/TableComponent/TableRow"
import TableCellEditDeleteIcon from "../../components/TableComponent/TableCellEditDeleteIcon"
import TableBody from "../../components/TableComponent/TableBody"
import TableCell from "../../components/TableComponent/TableCell"

const Button = lazy(async () => import("../../components/button/button"))

export default function FilterByDevice() {
    const tableRef = useRef(null)
    const { devices, loading, searchDevices } = useSearchDevice()
    return (
      <Main>
        <PageTitle title='Filtrar por Dispositivo' />
        <FilterManager handleFilter={searchDevices}>          
          <Button
            type='button'
            actionType='SAVE'
            text='Export Excel'
            handle={() => { import('../../utils/DownloadTableExcel').then(m => m.exportToExcel(tableRef)) }}
          />          
        </FilterManager>
        {loading && <SpinnerSKCircle />}
        {(!loading && devices.length === 0) && <p>No hay resultados</p>}
        {(!loading && devices.length > 0) && <Suspense fallback={<p>...Loading</p>}>
          <Table ref={tableRef} className=''>
            <TableHeader>
              <TableRow>
                <TableHead name='Acciones' />
                <TableHead name='Usuario' />
                <TableHead name='Ubicación' />
                <TableHead name='Categoria' />
                <TableHead name='Serial' />
                <TableHead name='Activo' />
                <TableHead name='Marca' />
                <TableHead name='Modelo' />
                <TableHead name='Observaciones' />
                <TableHead name='Nombre de Equipo' />
                <TableHead name='Procesador' />
                <TableHead name='Memoria Ram Total' />
                <TableHead name='Memoria Ram Modulos' />
                <TableHead name='Tipo' />
                <TableHead name='Disco Duro' />
                <TableHead name='Tipo' />
                <TableHead name='Sistema Operativo' />
                <TableHead name='Arquitectura' />
                <TableHead name='Dirección IP' />
              </TableRow>
            </TableHeader>
            <TableBody>
              {(devices as unknown as DevicesApiResponse[]).map((device) => (
                <TableRow key={device?.id}>
                  <TableCellEditDeleteIcon state={device} url={`/device/edit/${device.id}`} />
                  <TableCell value={device?.employee?.userName} url={`/employee/edit/${device.employeeId}`} />
                  <TableCell value={device?.location?.name} />
                  <TableCell value={device?.category?.name} />
                  <TableCell value={device?.serial} state={device} url={`/device/edit/${device.id}`} />
                  <TableCell value={device?.activo} />
                  <TableCell value={device?.brand?.name} />
                  <TableCell value={device?.model?.name} />
                  <TableCell value={device?.observation} />
                  <TableCell value={device?.computer?.computerName} />
                  <TableCell value={device?.computer ? `${device?.computer?.processor?.productCollection} ${device?.computer?.processor?.numberModel}` : ''} />
                  <TableCell value={device?.computer ? `${device?.computer?.memoryRamCapacity} Gb` : ''} />
                  <TableCell value={device?.computer ? device?.computer?.memoryRam.map(mem => mem).join(' / ') : ''} />
                  <TableCell value={device?.model?.modelComputer ? device?.model?.modelComputer.memoryRamType?.name : device?.model?.modelLaptop ? device?.model?.modelLaptop?.memoryRamType?.name : ''} />
                  <TableCell value={device?.computer ? `${device?.computer?.hardDriveCapacity?.name} Gb` : ''} />
                  <TableCell value={device?.computer?.hardDriveType?.name} />
                  <TableCell value={device?.computer?.operatingSystem?.name ?? 'N/A'} />
                  <TableCell value={device?.computer?.operatingSystemArq?.name ?? 'N/A'} />
                  <TableCell value={device?.computer?.ipAddress ?? 'N/A'} />
                </TableRow>
                        ))}
            </TableBody>
          </Table>
        </Suspense>}
      </Main>
    )
}