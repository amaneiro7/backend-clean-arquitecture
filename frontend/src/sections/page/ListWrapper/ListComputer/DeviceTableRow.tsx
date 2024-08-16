import { lazy, memo } from "react";
import { areEqual } from "react-window";
import { DevicesApiResponse } from "../../../../modules/shared/domain/types/responseTypes";

const TableRow = lazy(async () => import("../../../components/TableComponent/TableRow"))
const TableCell = lazy(async () => import("../../../components/TableComponent/TableCell"))
const TableCellEditDeleteIcon = lazy(async () => import("../../../components/TableComponent/TableCellEditDeleteIcon"))

interface Props {
    data: DevicesApiResponse[]
    style: React.CSSProperties
    index: number
}

export const DeviteRowTable = memo(({data: devices, style, index}: Props) => {
    return (
      <TableRow style={style} key={index}>
        <TableCellEditDeleteIcon typeOfSiteId={devices[index].location.typeOfSiteId} stateId={devices[index].id} state={devices[index]} url={`/device/edit/${devices[index].id}`} />
        <TableCell size='w-28' value={devices[index].employee?.userName} url={`/employee/edit/${devices[index].employeeId}`} />
        <TableCell size='w-52' value={devices[index].location?.name} />
        <TableCell size='w-28' value={devices[index]?.computer?.ipAddress} />
        <TableCell size='w-32' value={devices[index]?.serial ?? "Sin Serial"} state={devices[index]} url={`/device/edit/${devices[index].id}`} />
        <TableCell size='w-20' value={devices[index].status?.name} />
        <TableCell size='w-28' value={devices[index].category?.name} />
        <TableCell size='w-32' value={devices[index].brand?.name} />
        <TableCell size='w-52' value={devices[index].model?.name} />
        <TableCell size='w-52' value={devices[index]?.computer?.computerName} />
        <TableCell size='w-52' value={devices[index]?.computer ? `${devices[index]?.computer?.processor?.productCollection} ${devices[index]?.computer?.processor?.numberModel}` : ""} />
        <TableCell size='w-24' value={devices[index]?.computer ? `${devices[index]?.computer?.memoryRamCapacity} Gb` : ""} />
        <TableCell size='w-24' value={devices[index]?.computer ? devices[index]?.computer?.memoryRam?.map((mem) => mem).join(" / ") : ""} />
        <TableCell
          size='w-32'
          value={devices[index]?.model?.modelComputer ? devices[index]?.model?.modelComputer.memoryRamType?.name : devices[index]?.model?.modelLaptop ? devices[index]?.model?.modelLaptop?.memoryRamType?.name : ""}
        />
        <TableCell size='w-20' value={devices[index]?.computer?.hardDriveCapacity ? `${devices[index]?.computer?.hardDriveCapacity?.name} Gb` : ""} />
        <TableCell size='w-20' value={devices[index]?.computer?.hardDriveType?.name} />
        <TableCell size='w-32' value={devices[index]?.computer?.operatingSystem?.name} />
        <TableCell size='w-32' value={devices[index]?.computer?.operatingSystemArq?.name} />
        <TableCell size='w-52' value={devices[index].observation} />
      </TableRow>
)}, areEqual)