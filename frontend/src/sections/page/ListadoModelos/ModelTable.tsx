import { lazy, memo, useMemo } from "react"
import { FixedSizeList,  } from "react-window"
import { type ModelApiresponse } from "../../../modules/shared/domain/types/responseTypes"
import { type Primitives } from "../../../modules/shared/domain/value-object/Primitives"
import { type CategoryId } from "../../../modules/devices/category/domain/CategoryId"

import { ModelComputer } from "../../../modules/devices/model/ModelCharacteristics/modelComputer/ModelComputer"
import { ModelLaptop } from "../../../modules/devices/model/ModelCharacteristics/modelLaptop/ModelLaptop"
import { ModelPrinter } from "../../../modules/devices/model/ModelCharacteristics/modelPrinter/ModelPrinter"
import { ModelMonitor } from "../../../modules/devices/model/ModelCharacteristics/modelMonitor/ModelMonitor"
import { ModelKeyboard } from "../../../modules/devices/model/ModelCharacteristics/modelKeyboard/ModelKeyboard"

const TableWrapper = lazy(async () => import('./TableWrapper').then(m => ({ default: m.TableWraper })))
const ModelRowTable = lazy(async () => import('./ModelTableRow').then(m => ({ default: m.ModelTableRow })))
interface Props {
  models: ModelApiresponse[]
  categoryId: Primitives<CategoryId>
}
export interface CategorySelected {
  isComputer: boolean
  isLaptop: boolean
  isMonitor: boolean
  isPrinter: boolean
  isKeyboard: boolean
}
export const ModelTable = memo(({ models, categoryId }: Props) => {  

  const categorySelected: CategorySelected = useMemo(() => {
    return {
      isComputer: ModelComputer.isComputerCategory({ categoryId }),
      isLaptop: ModelLaptop.isLaptopCategory({ categoryId }),
      isMonitor: ModelMonitor.isMonitorCategory({ categoryId }),
      isPrinter: ModelPrinter.isPrinterCategory({ categoryId }),
      isKeyboard: ModelKeyboard.isKeyboardCategory({ categoryId }),  
    }
  },[categoryId])
  
    return (
      <>        
        <FixedSizeList 
          height={1024} 
          itemData={models}
          itemCount={models.length} 
          itemSize={44} 
          width='100%' 
          outerElementType='section'
          innerElementType={({style, children}) => <TableWrapper categorySelected={categorySelected} style={style}>{children}</TableWrapper>}
        >
          {({data, index, style}) => (
            <ModelRowTable 
              categorySelected={categorySelected} 
              data={data}
              index={index}
              style={style}
            />

            )}
        </FixedSizeList>
      </>
  )
})