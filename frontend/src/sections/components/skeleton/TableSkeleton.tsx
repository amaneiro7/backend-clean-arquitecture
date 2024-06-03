import { TableRowSkeleton } from "./TableRowSkeleton";

export function TableSkeleton() {  
  return (
    <div className="border border-blue-300 shadow rounded-md p-4 max-w-full w-full mx-auto flex-1">
      <div className="h-full animate-pulse flex flex-col gap-6">
        <div className="h-6 w-full bg-slate-700 rounded"></div>
        <TableRowSkeleton />
      </div>
    </div>
  );
}

export default TableSkeleton;