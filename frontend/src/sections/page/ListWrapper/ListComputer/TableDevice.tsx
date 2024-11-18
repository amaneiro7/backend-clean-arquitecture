import { lazy, Suspense, useState } from "react"
import { type DevicesApiResponse } from "@/modules/shared/domain/types/responseTypes"

const Table = lazy(async () => import("../../../components/Table/Table").then(m => ({ default: m.Table })))
const TableHeader = lazy(async () => import("../../../components/Table/TableHeader").then(m => ({ default: m.TableHeader })))
const TableRow = lazy(async () => import("../../../components/Table/TableRow").then(m => ({ default: m.TableRow })))
const TableBody = lazy(async () => import("../../../components/Table/TableBody").then(m => ({ default: m.TableBody })))
const TableHead = lazy(async () => import("../../../components/Table/TableHead").then(m => ({ default: m.TableHead })))
const TableCell = lazy(async () => import("@/sections/components/Table/TableCell").then(m => ({ default: m.TableCell })))
const TableCellDescInfo = lazy(async () => import("@/sections/components/Table/TableCellDescInfo").then(m => ({ default: m.TableCellDescInfo })))
const TableCellDescription = lazy(async () => import("@/sections/components/Table/TableCellDescription").then(m => ({ default: m.TableCellDescription })))
const TableCellOpenIcon = lazy(async () => import("@/sections/components/Table/TableCellOpenIcon").then(m => ({ default: m.TableCellOpenIcon })))

interface Props {
    devices: DevicesApiResponse[] 
}
export function TablerWraper({devices}: Props) {
    const [expandedRows, setExpandedRows] = useState([])    
     const handleRowClick = (id: DevicesApiResponse['id']) => { 
        const currentExpandedRows = [...expandedRows] 
        const isRowCurrentlyExpanded = currentExpandedRows.includes(id) 
        const newExpandedRows = isRowCurrentlyExpanded ? currentExpandedRows.filter(rowId => rowId !== id) : currentExpandedRows.concat(id) 
        setExpandedRows(newExpandedRows)
    }
    return (
      <Suspense>
        <Table>
          <TableHeader>        
            <TableRow>
              <TableHead name='Usuario' />
              <TableHead name='Ubicación' />
              <TableHead name='Dirección IP' />
              <TableHead name='Serial' />          
              <TableHead name='Categoria' />
              <TableHead name='Marca' />
              <TableHead name='Modelo' />
              <TableHead name='Nombre de Equipo' />              
              <TableHead name='Observaciones' />
              <TableHead name='' />
            </TableRow>
          </TableHeader>
          <TableBody>
            {
            devices.map(device => (
              <Suspense key={device.id}>
                <TableRow className={`[&>td]:cursor-pointer ${expandedRows.includes(device.id) && '[&>td]:bg-slate-200 [&>td]:border-b-slate-200'}`} onClick={() => handleRowClick(device.id)}>                  
                  <TableCell size='small' value={device.employee?.userName} />
                  <TableCell size='large' value={device.location?.name} />
                  <TableCell size='small' value={device.computer?.ipAddress} />
                  <TableCell size='small' value={device.serial} />
                  <TableCell size='small' value={device.category?.name} />
                  <TableCell size='small' value={device.brand?.name} />
                  <TableCell size='xLarge' value={device.model?.name} />
                  <TableCell size='small' value={device.computer?.computerName} />
                  <TableCell size='small' value={device.observation} />
                  <TableCellOpenIcon open={expandedRows.includes(device.id)} />
                </TableRow>
                <Suspense>
                  <TableCellDescription
                    open={expandedRows.includes(device.id)}
                    state={device} 
                    stateId={device.id} 
                    url={`/device/edit/${device.id}`} 
                    colspan={10}
                  >
                    <TableCellDescInfo 
                      title='Procesador' 
                      text={device.computer ? `${device?.computer?.processor?.productCollection} ${device?.computer?.processor?.numberModel}` : ""}
                    />
                    <TableCellDescInfo 
                      title='Memoria Ram' 
                      text={device.computer ? `${device?.computer?.memoryRamCapacity} Gb` : ""}
                    />
                    <TableCellDescInfo 
                      title='Modulos' 
                      text={device.computer ? device?.computer?.memoryRam?.map((mem) => mem).join(" / ") : ""}
                    />
                    <TableCellDescInfo 
                      title='Tipo' 
                      text={device?.model?.modelComputer ? device?.model?.modelComputer?.memoryRamType?.name : device?.model?.modelLaptop ? device?.model?.modelLaptop?.memoryRamType?.name : ""}
                    />
                    <TableCellDescInfo 
                      title='Disco Duro' 
                      text={device?.computer?.hardDriveCapacity ? `${device?.computer?.hardDriveCapacity?.name} Gb` : ""}
                    />
                    <TableCellDescInfo 
                      title='Tipo' 
                      text={device?.computer?.hardDriveType?.name ?? ''}
                    />
                    <TableCellDescInfo 
                      title='Sistema Operativo' 
                      text={device?.computer?.operatingSystem?.name ?? ''}
                    />
                    <TableCellDescInfo 
                      title='Arquitectura del Sistema Operativo' 
                      text={device?.computer?.operatingSystemArq?.name ?? ''}
                    />
                  </TableCellDescription>
                </Suspense>
              </Suspense>
            ))
        }
          </TableBody>
        </Table>
      </Suspense>
    )
    }