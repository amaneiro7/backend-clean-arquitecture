import { lazy, Suspense } from 'react'
import { OnHandleChange } from "../../../modules/shared/domain/types/types"
import { DefaultModelProps } from '../../Hooks/model/ModelFormInitialState'
import { ModelKeyboard } from '../../../modules/devices/model/ModelCharacteristics/modelKeyboard/ModelKeyboard'


interface Props {
    formData: DefaultModelProps
    onChange: OnHandleChange
}

const InputTypeComboBox = lazy(async () => import('../../components/combo_box/InputTypeComboBox').then(m => ({ default: m.InputTypeComboBox })))
const Checkbox = lazy(async () => import('../../components/checkbox').then(m => ({ default: m.Checkbox })))

export function AddModelKeyboard({ formData, onChange }: Props) {
    const isKeyboardCategory = ModelKeyboard.isKeyboardCategory({ categoryId: formData.categoryId })

    return (
        <>
            {isKeyboardCategory &&
                <>
                    <div className='grid grid-flow-col gap-4'>
                        <Suspense>
                            <InputTypeComboBox
                                onChange={onChange}
                                type='form'
                                value={formData.inputTypeId}
                            />
                            <Checkbox
                                label="Tiene lector de huella"
                                text="¿Tiene lector de huella?"
                                name="hasFingerPrintReader"
                                value={formData.hasFingerPrintReader}
                                handle={(event) => {
                                    const { name, checked } = event.target
                                    onChange(name, checked);
                                }}
                            />
                        </Suspense>
                    </div>

                </>
            }
        </>
    )
}