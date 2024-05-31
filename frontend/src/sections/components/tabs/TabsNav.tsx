import { type TabNav } from './TabNav'
interface Props<T> extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    children: React.ReactElement<T> | Array<React.ReactElement<T>>
}
export function TabsNav<T extends typeof TabNav>({ children, ...props }: Props<T>) {
    return (
        <div
            className='flex items-center'
            {...props}
        >
            {children}
        </div>
    )
}