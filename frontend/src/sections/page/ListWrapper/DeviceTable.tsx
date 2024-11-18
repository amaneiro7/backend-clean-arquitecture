// import { lazy, memo, Suspense } from "react"
// import { FixedSizeList } from "react-window"
// import { type DevicesApiResponse } from "@/modules/shared/domain/types/responseTypes"

// const TableWrapper = lazy(async () => import('./TableWrapper').then(m => ({default: m.TableWraper})))
// const DeviteRowTable = lazy(async () => import('./DeviceTableRow').then(m => ({default: m.DeviteRowTable})))
// interface Props {
//   devices: DevicesApiResponse[]
// }
// export const TableRef = ({ devices }: Props) => {  
//     return (
//       <Suspense>
//         {/* <FixedSizeList 
//           height={1024} 
//           itemData={devices} 
//           itemCount={devices.length} 
//           itemSize={44} 
//           width='100%' 
//           outerElementType='section'
//           innerElementType={TableWrapper}
//         >
//           {DeviteRowTable}
//         </FixedSizeList> */}
//       </Suspense>
//   )
// }

// export const DeviceTable = memo(TableRef)

import { lazy, memo, Suspense } from "react"

const Table = lazy(async () => import("@/sections/components/TableComponent/Table2"))
const TableHeader = lazy(async () => import("@/sections/components/TableComponent/TableHeader"))
const TableRow = lazy(async () => import("@/sections/components/TableComponent/TableRow"))
const TableBody = lazy(async () => import("@/sections/components/TableComponent/TableBody"))
const TableHead = lazy(async () => import("@/sections/components/TableComponent/TableHead"))

interface Props {
  style: React.CSSProperties
  children: React.ReactNode
}

export const DeviceTable = memo(({ children, style }: Props) => (      
  <Suspense>
    <Table>            
      <TableHeader>        
        <TableRow>
          <TableHead style={{ width: '80px' }} size='min-w-20' name='Acciones' />
          <TableHead style={{ width: '112px' }} size='min-w-28' name='Usuario' />
          <TableHead style={{ width: '240px' }} size='min-w-60' name='Ubicación' />
          <TableHead style={{ width: '144px' }} size='min-w-36' name='Serial' />
          <TableHead style={{ width: '112px' }} size='min-w-28' name='Estado' />
          <TableHead style={{ width: '144px' }} size='min-w-36' name='Categoria' />
          <TableHead style={{ width: '144px' }} size='min-w-36' name='Marca' />
          <TableHead style={{ width: '192px' }} size='min-w-48' name='Modelo' />                
          <TableHead style={{ minWidth: '100%' }} name='Observaciones' />
        </TableRow>
          
      </TableHeader>
      <Suspense>
        <TableBody className='relative' style={style}>
          {children}
        </TableBody>
      </Suspense>

    </Table>
  </Suspense>
    ))