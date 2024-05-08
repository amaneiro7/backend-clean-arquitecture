export function TableSkeleton() {
  const repeatedElement = new Array(10).fill(0)
  return (
    <div className="border border-blue-300 shadow rounded-md p-4 max-w-full w-full mx-auto flex-1">
      <div className="h-full animate-pulse flex flex-col gap-6">
        <div className="h-6 w-full bg-slate-700 rounded"></div>
        {repeatedElement.map((_,index) => (
          <div key={index} className="w-full flex gap-4">
            <span className="w-6 h-6 bg-slate-400 rounded-full"></span>
            <span className="h-6 bg-slate-400 rounded flex-1"></span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TableSkeleton;