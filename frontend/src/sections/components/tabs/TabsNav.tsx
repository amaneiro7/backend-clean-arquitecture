import { type TabNav } from './TabNav'
interface Props<T> extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    children: React.ReactElement<T> | Array<React.ReactElement<T>>
}
export function TabsNav<T extends typeof TabNav>({ children, ...props }: Props<T>) {
    return (
        <div
            className='mb-4 flex items-center [&>a:first-child]:text-secondary'
            {...props}
        >
            {children}
        </div>
    )
}