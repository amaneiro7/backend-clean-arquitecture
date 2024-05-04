import { useAppContext } from "../../Context/AppContext";
import Main from "../../components/Main";
import PageTitle from "../../components/PageTitle";
import { FilterManager } from "../../components/Filter/FilterManager";
import { useSearchDevice } from "../../Device/device/useSearchDevice";
import { SpinnerSKCircle } from "../../components/Loading/spinner-sk-circle";
import { Suspense, useRef } from "react";
import TableHeader from "../../components/TableComponent/TableHeader";
import TableHead from "../../components/TableComponent/TableHead";
import { DevicesMappedApiResponse } from "../../../modules/shared/domain/types/responseTypes";
import Table from "../../components/TableComponent/Table";
import TableRow from "../../components/TableComponent/TableRow";
import TableCellEditDeleteIcon from "../../components/TableComponent/TableCellEditDeleteIcon";
import TableBody from "../../components/TableComponent/TableBody";
import TableCell from "../../components/TableComponent/TableCell";
import { DownloadTable } from "../../components/button/DownloadTableExcel";

export default function FilterByDevice() {
    const tableRef = useRef(null)
    const { repository } = useAppContext()
    const { devices, loading, searchDevices } = useSearchDevice(repository)    
    return (
        <Main>
            <PageTitle title="Filtrar por Dispositivo" />
            <FilterManager handleFilter={searchDevices}>
                <DownloadTable ref={tableRef} />
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
                            <TableHead name='Memoria Ram' />
                            <TableHead name='Disco Duro' />
                            <TableHead name='Sistema Operativo' />
                            <TableHead name='Arquitectura' />
                            <TableHead name='Dirección IP' />
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {(devices as unknown as DevicesMappedApiResponse[]).map((device) => (
                            <TableRow key={device?.id}>
                                <TableCellEditDeleteIcon state={device} url={`/device/edit/${device.id}`} />
                                <TableCell value={device.employeeUserName} />
                                <TableCell value={device.locationName} />
                                <TableCell value={device.categoryName} />
                                <TableCell value={device.serial} />
                                <TableCell value={device.activo} />
                                <TableCell value={device.brandName} />
                                <TableCell value={device.modelName} />
                                <TableCell value={device.observation} />
                                <TableCell value={device?.computer?.computerName ?? 'N/A'} />
                                <TableCell value={device?.computer?.processor?.numberModel ?? 'N/A'} />
                                <TableCell value={device?.computer?.memoryRamCapacity ? `${device?.computer?.memoryRamCapacity} Gb` : 'N/A'} />
                                <TableCell value={device?.computer?.hardDriveCapacity?.name ? `${device?.computer?.hardDriveCapacity?.name} Gb` : 'N/A'} />
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