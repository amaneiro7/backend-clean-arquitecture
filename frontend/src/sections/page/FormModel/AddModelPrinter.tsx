import { lazy, Suspense } from 'react'
import { OnHandleChange } from "../../../modules/shared/domain/types/types"
import { DefaultModelProps } from './ModelFormInitialState'
import { ModelPrinter } from '../../../modules/devices/model/ModelCharacteristics/modelPrinter/ModelPrinter'


interface Props {
    formData: DefaultModelProps
    onChange: OnHandleChange
}

const CartridgeModelInput = lazy(async () => import('../../components/text-inputs/CartridgeModelInput').then(m => ({ default: m.CartridgeModelInput })))

export function AddModelPrinter({ formData, onChange }: Props) {
    const isPrinterCategory = ModelPrinter.isPrinterCategory({ categoryId: formData.categoryId })
    
    return (
        <>
            {isPrinterCategory &&
                <>
                    <div className='flex gap-4'>
                        <Suspense>
                            <CartridgeModelInput
                                onChange={onChange}
                                type='form'
                                value={formData.cartridgeModel}
                            />
                        </Suspense>
                    </div>
                   
                </>
            }
        </>
    )
}