import { lazy, memo, Suspense } from "react"
import { FixedSizeList } from "react-window"
import { type DevicesApiResponse } from "@/modules/shared/domain/types/responseTypes"

const TableWrapper = lazy(async () => import('./TableWrapper').then(m => ({default: m.TableWraper})))
const DeviteRowTable = lazy(async () => import('./DeviceTableRow').then(m => ({default: m.DeviteRowTable})))
interface Props {
  devices: DevicesApiResponse[]
}
export const TableRef = ({ devices }: Props) => {  
    return (
      <Suspense>        
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
        </FixedSizeList>
      </Suspense>
  )
}

export const DeviceTable = memo(TableRef)