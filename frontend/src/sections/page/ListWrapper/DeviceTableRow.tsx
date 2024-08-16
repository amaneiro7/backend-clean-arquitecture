import { lazy, memo } from "react";
import { areEqual } from "react-window";
import { DevicesApiResponse } from "../../../modules/shared/domain/types/responseTypes";

const TableRow = lazy(async () => import("../../components/TableComponent/TableRow"))
const TableCell = lazy(async () => import("../../components/TableComponent/TableCell"))
const TableCellEditDeleteIcon = lazy(async () => import("../../components/TableComponent/TableCellEditDeleteIcon"))

interface Props {
    data: DevicesApiResponse[]
    style: React.CSSProperties
    index: number
}

export const DeviteRowTable = memo(({data: devices, style, index}: Props) => {
    return (
      <TableRow style={style} key={index}>
        <TableCellEditDeleteIcon stateId={devices[index].id} state={devices[index]} url={`/device/edit/${devices[index].id}`} />
        <TableCell style={{ width: '112px' }} size='w-28' value={devices[index]?.employee?.userName} url={`/employee/edit/${devices[index].employeeId}`} />
        <TableCell style={{ width: '240px' }} size='w-60' value={devices[index]?.location?.name} />
        <TableCell style={{ width: '144px' }} size='w-36' value={devices[index]?.serial ?? "Sin Serial"} state={devices[index]} url={`/device/edit/${devices[index].id}`} />
        <TableCell style={{ width: '112px' }} size='w-28' value={devices[index]?.status?.name} />
        <TableCell style={{ width: '144px' }} size='w-36' value={devices[index]?.category?.name} />
        <TableCell style={{ width: '144px' }} size='w-36' value={devices[index]?.brand?.name} />
        <TableCell style={{ width: '192px' }} size='w-48' value={devices[index]?.model?.name} />
        <TableCell style={{ width: '100%' }} value={devices[index]?.observation} />
      </TableRow>
)}, areEqual)