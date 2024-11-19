import { lazy, Suspense, useState } from "react"
import { type DevicesApiResponse } from "@/modules/shared/domain/types/responseTypes"

const Table = lazy(async () => import("@/sections/components/Table/Table").then(m => ({ default: m.Table })))
const TableHeader = lazy(async () => import("@/sections/components/Table/TableHeader").then(m => ({ default: m.TableHeader })))
const TableRow = lazy(async () => import("@/sections/components/Table/TableRow").then(m => ({ default: m.TableRow })))
const TableBody = lazy(async () => import("@/sections/components/Table/TableBody").then(m => ({ default: m.TableBody })))
const TableHead = lazy(async () => import("@/sections/components/Table/TableHead").then(m => ({ default: m.TableHead })))
const TableCell = lazy(async () => import("@/sections/components/Table/TableCell").then(m => ({ default: m.TableCell })))
const TableCellDescInfo = lazy(async () => import("@/sections/components/Table/TableCellDescInfo").then(m => ({ default: m.TableCellDescInfo })))
const TableCellDescription = lazy(async () => import("@/sections/components/Table/TableCellDescription").then(m => ({ default: m.TableCellDescription })))
const TableCellOpenIcon = lazy(async () => import("@/sections/components/Table/TableCellOpenIcon").then(m => ({ default: m.TableCellOpenIcon })))

interface Props {
    devices: DevicesApiResponse[] 
}

export function DefaultDeviceTable({devices}: Props) {
    const [expandedRows, setExpandedRows] = useState([])    
    // This function handles the event when a row is clicked. It takes the ID of the clicked row as an argument.
    // It first creates a copy of the current expanded rows.
    // Then, it checks if the clicked row is currently expanded.
    // If it is expanded, it removes the ID from the list of expanded rows.
    // If it's not expanded, it adds the ID to the list of expanded rows.
    // Finally, it updates the state with the new list of expanded rows.
    const handleRowClick = (id: DevicesApiResponse['id']) => { 
      const currentExpandedRows = [...expandedRows] // Create a copy of the current expanded rows
      const isRowCurrentlyExpanded = currentExpandedRows.includes(id) // Check if the clicked row is currently expanded
      const newExpandedRows = isRowCurrentlyExpanded ? 
        currentExpandedRows.filter(rowId => rowId !== id) // If it is expanded, remove the ID from the list of expanded rows
        : currentExpandedRows.concat(id) // If it's not expanded, add the ID to the list of expanded rows
      setExpandedRows(newExpandedRows) // Update the state with the new list of expanded rows
    }
    return (
      <Suspense>
        <Table>
          <TableHeader>        
            <TableRow>
              <TableHead size='small' name='Usuario' />
              <TableHead size='large' name='Ubicación' />              
              <TableHead size='small' name='Serial' />          
              <TableHead size='small' name='Categoria' />
              <TableHead size='small' name='Marca' />
              <TableHead size='xLarge' name='Modelo' />              
              <TableHead size='small' name='Observaciones' />
              <TableHead size='xxSmall' name='' />
            </TableRow>
          </TableHeader>
          <TableBody>
            {
            devices?.map(device => (
              <Suspense key={device.id}>
                <TableRow className={`[&>td]:cursor-pointer ${expandedRows.includes(device.id) && '[&>td]:bg-slate-200 [&>td]:border-b-slate-200'}`} onClick={() => handleRowClick(device.id)}>                  
                  <TableCell size='small' value={device.employee?.userName} />
                  <TableCell size='large' value={device.location?.name} />                  
                  <TableCell size='small' value={device.serial} />
                  <TableCell size='small' value={device.category?.name} />
                  <TableCell size='small' value={device.brand?.name} />
                  <TableCell size='xLarge' value={device.model?.name} />                  
                  <TableCell size='small' value={device.observation} />
                  <TableCellOpenIcon open={expandedRows.includes(device.id)} />
                </TableRow>
                {/* <Suspense>
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
                </Suspense> */}
              </Suspense>
            ))
        }
          </TableBody>
        </Table>
      </Suspense>
    )
    }