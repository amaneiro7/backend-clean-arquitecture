import { lazy, Suspense } from 'react'
import { type TabProps } from '../../mui/Tab'
interface Props extends TabProps {

}

const Tab = lazy(async () => import('../../mui/Tab').then(m => ({ default: m.Tab })))
export function TabNav({ ...props }: Props) {
    return (
        <Suspense>
            <Tab
                sx={{
                    padding: '4px',
                    fontSize: '12px',
                    willChange: 'scroll-position',
                    width: 'min-content'
                }}
                wrapped
                {...props}
            />
        </Suspense>
    )
}