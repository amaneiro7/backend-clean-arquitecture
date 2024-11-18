import { Suspense, lazy } from "react"

const TableCellWithUrl = lazy(() => import("./TableCellWithUrl").then((m) => ({ default: m.TableCellWithUrl })))
const TableCellText = lazy(() => import("./TableCellText").then((m) => ({ default: m.TableCellText })))
interface Props<T> extends React.DetailedHTMLProps<React.TdHTMLAttributes<HTMLTableCellElement>, HTMLTableCellElement> {
  value: string | number, 
  url?: string, 
  state?: T  
  size?: keyof typeof SIZE
}

const SIZE = {
  xSmall: 'w-20', // 80px
  small: 'w-28', // 112px
  medium: 'w-36', // 144px
  large: 'w-44', // 176px
  xLarge: 'w-52' // 224px
} as const

export function TableCell<T>({ value, url, state, size = 'xSmall', ...props }: React.PropsWithChildren<Props<T>>) {
  return (
    <td
      className={`min-h-8 h-8 ${SIZE[size]} p-0 text-gray-800 overflow-hidden whitespace-nowrap text-ellipsis border-b-2 border-b-gray-300`}
      aria-label={`${value}`}
      title={`${value}`}
      {...props}
    >
      {url ? 
        <Suspense><TableCellWithUrl value={value} url={url} state={state}  /></Suspense>
      : <Suspense><TableCellText value={value} /></Suspense>}
    </td>
  )
}

