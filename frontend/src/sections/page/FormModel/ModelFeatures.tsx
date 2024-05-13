import { lazy, Suspense } from 'react'
import { OnHandleChange } from "../../../modules/shared/domain/types/types"

interface Props {
    formData: any
    onChange: OnHandleChange
}

const AddModelComputer = lazy(async () => import('./AddModelComputer').then(m => ({ default: m.AddModelComputer })))
export function ModelFeatures({ onChange, formData }: Props) {
    return (
        <Suspense>
            <AddModelComputer formData={formData} onChange={onChange} />
        </Suspense>
    )
}