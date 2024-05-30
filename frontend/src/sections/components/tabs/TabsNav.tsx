import { lazy, Suspense } from "react"
import { type TabNav } from './TabNav'
import { type TabsProps } from '../../mui/Tabs'

const Tabs = lazy(async () => import('../../mui/Tabs').then(m => ({ default: m.Tabs })))

interface Props<T> extends TabsProps {
    children: React.ReactElement<T> | Array<React.ReactElement<T>>    
}
export function TabsNav<T extends typeof TabNav>({ children, ...props }: Props<T>) {
    return (
        <Suspense>
            <Tabs
                {...props}
            >
                {children}
            </Tabs>
        </Suspense>
    )
}