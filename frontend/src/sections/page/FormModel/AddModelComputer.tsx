import { lazy, Suspense } from 'react'
import { OnHandleChange } from "../../../modules/shared/domain/types/types"
import { ModelComputer } from '../../../modules/devices/model/ModelCharacteristics/modelComputer/ModelComputer'
import { DefaultModelProps } from './ModelFormInitialState'
import { ModelLaptop } from '../../../modules/devices/model/ModelCharacteristics/modelLaptop/ModelLaptop'

interface Props {
    formData: DefaultModelProps
    onChange: OnHandleChange
}
const MemoryRamTypeComboBox = lazy(async () => import('../../components/combo_box/MemoryRamTypeComboBox').then(m => ({ default: m.MemoryRamTypeComboBox })))
const MemoryRamSlotQuantityInput = lazy(async () => import('../../components/number-inputs/MemoryRamSlotQuantity').then(m => ({ default: m.MemoryRamSlotQuantityInput })))
const Checkbox = lazy(async () => import('../../components/checkbox').then(m => ({ default: m.Checkbox })))
const BatteryModelInput = lazy(async () => import('../../components/text-inputs/BatteryModel').then(m => ({ default: m.BatteryModelInput })))


export function AddModelComputer({ formData, onChange }: Props) {
    const isComputerModel = ModelComputer.isComputerCategory({ categoryId: formData.categoryId })
    const isLaptopModel = ModelLaptop.isLaptopCategory({ categoryId: formData.categoryId })
    return (
        <>
            {(isComputerModel || isLaptopModel) &&
                <>
                    <div className='flex gap-4'>
                        <Suspense>
                            <MemoryRamTypeComboBox
                                value={formData.memoryRamTypeId}
                                onChange={onChange}
                                type='form'
                            />
                        </Suspense>
                        <Suspense>
                            <MemoryRamSlotQuantityInput
                                onChange={onChange}
                                type='form'
                                value={formData.memoryRamSlotQuantity}
                            />
                        </Suspense>
                    </div>
                    <Suspense>
                        <div className='grid md:grid-cols-3 grid-flow-row gap-4'>
                            <Checkbox
                                label="Tiene Puerto VGA"
                                text="¿Tiene Puerto VGA?"
                                name="hasVGA"
                                value={formData.hasVGA}
                                handle={(event) => {
                                    const { name, checked } = event.target
                                    onChange(name, checked);
                                }}
                            />
                            <Checkbox
                                label="Tiene Puerto DVI"
                                text="¿Tiene Puerto DVI?"
                                name="hasDVI"
                                value={formData.hasDVI}
                                handle={(event) => {
                                    const { name, checked } = event.target
                                    onChange(name, checked);
                                }}
                            />
                            <Checkbox
                                label="Tiene Puerto HDMI"
                                text="¿Tiene Puerto HDMI?"
                                name="hasHDMI"
                                value={formData.hasHDMI}
                                handle={(event) => {
                                    const { name, checked } = event.target
                                    onChange(name, checked);
                                }}
                            />
                            <Checkbox
                                label="Tiene BlueTooth"
                                text="¿Tiene Bluetooth?"
                                name="hasBluetooth"
                                value={formData.hasBluetooth}
                                handle={(event) => {
                                    const { name, checked } = event.target
                                    onChange(name, checked);
                                }}
                            />
                            <Checkbox
                                label="Tiene WiFi"
                                text="¿Tiene Adaptador Wifi?"
                                name="hasWifiAdapter"
                                value={formData.hasWifiAdapter}
                                handle={(event) => {
                                    const { name, checked } = event.target
                                    onChange(name, checked);
                                }}
                            />
                        </div>
                    </Suspense>
                </>
            }
            {isLaptopModel &&
                <BatteryModelInput 
                    onChange={onChange}
                    type='form'
                    value={formData.batteryModel}
                />
            }
        </>
    )
}