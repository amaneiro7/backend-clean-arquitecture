import { lazy, memo } from "react";
import { areEqual } from "react-window";
import { DevicesApiResponse } from "../../../modules/shared/domain/types/responseTypes";

const TableRow = lazy(async () => import("../../components/TableComponent/TableRow"))
const TableCell = lazy(async () => import("../../components/TableComponent/TableCell"))
const TableCellEditDeleteIcon = lazy(async () => import("../../components/TableComponent/TableCellEditDeleteIcon"))

interface Props {
    devices: DevicesApiResponse[]
    index: number
}

export const DeviteRowTable = memo(({devices, index}: Props) => {
    return (
      <TableRow key={index}>
        <TableCellEditDeleteIcon stateId={devices[index].id} state={devices[index]} url={`/device/edit/${devices[index].id}`} />
        <TableCell value={devices[index].employee?.userName} url={`/employee/edit/${devices[index].employeeId}`} />
        <TableCell value={devices[index].location?.name} />
        <TableCell value={devices[index]?.computer?.ipAddress} />
        <TableCell value={devices[index].serial ?? "Sin Serial"} state={devices[index]} url={`/devices[index]/edit/${devices[index].id}`} />
        <TableCell value={devices[index].status?.name} />
        <TableCell value={devices[index].category?.name} />
        <TableCell value={devices[index].brand?.name} />
        <TableCell value={devices[index].model?.name} />
        <TableCell value={devices[index]?.computer?.computerName} />
        <TableCell value={devices[index]?.computer ? `${devices[index]?.computer?.processor?.productCollection} ${devices[index]?.computer?.processor?.numberModel}` : ""} />
        <TableCell value={devices[index]?.computer ? `${devices[index]?.computer?.memoryRamCapacity} Gb` : ""} />
        <TableCell value={devices[index]?.computer ? devices[index]?.computer?.memoryRam.map((mem) => mem).join(" / ") : ""} />
        <TableCell
          value={devices[index]?.model?.modelComputer ? devices[index]?.model?.modelComputer.memoryRamType?.name : devices[index]?.model?.modelLaptop ? devices[index]?.model?.modelLaptop?.memoryRamType?.name : ""}
        />
        <TableCell value={devices[index]?.computer ? `${devices[index]?.computer?.hardDriveCapacity?.name} Gb` : ""} />
        <TableCell value={devices[index]?.computer?.hardDriveType?.name} />
        <TableCell value={devices[index]?.computer?.operatingSystem?.name} />
        <TableCell value={devices[index]?.computer?.operatingSystemArq?.name} />
        <TableCell value={devices[index].observation} />
      </TableRow>
)}, areEqual)