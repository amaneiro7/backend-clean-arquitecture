import { lazy, memo } from "react";
import { areEqual } from "react-window";
import { ModelApiresponse } from "../../../modules/shared/domain/types/responseTypes";
import { CategorySelected } from "./ModelTable";

const TableRow = lazy(async () => import("../../components/TableComponent/TableRow"))
const TableCell = lazy(async () => import("../../components/TableComponent/TableCell"))
const TableCellEditDeleteIcon = lazy(async () => import("../../components/TableComponent/TableCellEditDeleteIcon"))

interface Props {
    data: ModelApiresponse[]
    style: React.CSSProperties
    index: number
    categorySelected: CategorySelected
}

export const ModelTableRow = memo(({
  data: models, 
  style, 
  index,
  categorySelected: {
    isComputer,
    isKeyboard,
    isLaptop,
    isMonitor,
    isPrinter
  }
}: Props) => {
    return (
      <TableRow style={style} key={index}>        
        <TableCellEditDeleteIcon stateId={models[index].id} state={models[index]} url={`/model/edit/${models[index].id}`} />
        <TableCell style={{ width: '144px' }} size='w-36' value={models[index].category?.name} />
        <TableCell style={{ width: '144px' }} size='w-36' value={models[index].brand?.name} />
        <TableCell style={{ width: '144px' }} size='w-36' value={models[index].name} />
      
        {!(isMonitor || isPrinter || isKeyboard) && <TableCell style={{ width: '80px' }} size='w-20' value={models[index]?.modelComputer?.memoryRamType?.name || models[index]?.modelLaptop?.memoryRamType?.name} />}
        {!(isMonitor || isPrinter || isKeyboard) && <TableCell style={{ width: '80px' }} size='w-20' value={models[index]?.modelComputer?.memoryRamSlotQuantity || models[index]?.modelLaptop?.memoryRamSlotQuantity} />}
        {!(isPrinter || isKeyboard) && <TableCell style={{ width: '80px' }} size='w-20' value={(models[index]?.modelComputer || models[index]?.modelLaptop || models[index]?.modelMonitor) ? (models[index]?.modelComputer?.hasVGA || models[index]?.modelLaptop?.hasVGA || models[index]?.modelMonitor?.hasVGA ? 'Si' : 'No') : ''} />}
        {!(isPrinter || isKeyboard) && <TableCell style={{ width: '80px' }} size='w-20' value={(models[index]?.modelComputer || models[index]?.modelLaptop || models[index]?.modelMonitor) ? (models[index]?.modelComputer?.hasDVI || models[index]?.modelLaptop?.hasDVI || models[index]?.modelMonitor?.hasDVI ? 'Si' : 'No') : ''} />}
        {!(isPrinter || isKeyboard) && <TableCell style={{ width: '80px' }} size='w-20' value={(models[index]?.modelComputer || models[index]?.modelLaptop || models[index]?.modelMonitor) ? (models[index]?.modelComputer?.hasHDMI || models[index]?.modelLaptop?.hasHDMI || models[index]?.modelMonitor?.hasHDMI ? 'Si' : 'No') : ''} />}
        {!(isMonitor || isPrinter || isKeyboard) && <TableCell style={{ width: '80px' }} size='w-20' value={(models[index]?.modelComputer || models[index]?.modelLaptop) ? (models[index]?.modelComputer?.hasBluetooth || models[index]?.modelLaptop?.hasBluetooth ? 'Si' : 'No') : ''} />}
        {!(isMonitor || isPrinter || isKeyboard) && <TableCell style={{ width: '80px' }} size='w-20' value={(models[index]?.modelComputer || models[index]?.modelLaptop) ? (models[index]?.modelComputer?.hasWifiAdapter || models[index]?.modelLaptop?.hasWifiAdapter ? 'Si' : 'No') : ''} />}
        {!(isComputer || isMonitor || isPrinter || isKeyboard) && <TableCell style={{ width: '80px' }} size='w-20' value={models[index]?.modelLaptop?.batteryModel} />}
        {!(isComputer || isLaptop || isPrinter || isKeyboard) && <TableCell style={{ width: '80px' }} size='w-20' value={models[index]?.modelMonitor ? `${models[index]?.modelMonitor.screenSize} pulgadas` : ''} />}
        {!(isComputer || isLaptop || isMonitor || isKeyboard) && <TableCell style={{ width: '80px' }} size='w-20' value={models[index]?.modelPrinter?.cartridgeModel} />}
        {!(isComputer || isLaptop || isMonitor || isPrinter) && <TableCell style={{ width: '80px' }} size='w-20' value={models[index]?.modelKeyboard?.inputType?.name} />}
        {!(isComputer || isLaptop || isMonitor || isPrinter) && <TableCell style={{ width: '80px' }} size='w-20' value={models[index]?.modelKeyboard ? (models[index]?.modelKeyboard?.hasFingerPrintReader ? 'Si' : 'No') : ''} />}
        <TableCell style={{ width: '100%' }} value='' />
      </TableRow>
)}, areEqual)