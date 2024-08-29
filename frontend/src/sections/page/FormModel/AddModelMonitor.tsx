import { lazy, Suspense } from 'react'
import { OnHandleChange } from "../../../modules/shared/domain/types/types"
import { DefaultModelProps } from '../../Hooks/model/ModelFormInitialState'
import { ModelMonitor } from '../../../modules/devices/model/ModelCharacteristics/modelMonitor/ModelMonitor'

interface Props {
    formData: DefaultModelProps
    onChange: OnHandleChange
}

const ScreenSizeInput = lazy(async () => import('../../components/number-inputs/ScreenSizeInput').then(m => ({ default: m.ScreenSizeInput })))
const Checkbox = lazy(async () => import('../../components/checkbox').then(m => ({ default: m.Checkbox })))

export function AddModelMonitor({ formData, onChange }: Props) {
    const isMonitorModel = ModelMonitor.isMonitorCategory({ categoryId: formData.categoryId })

    return (
      <>
        {isMonitorModel &&
          <>
            <div className='flex gap-4'>
              <Suspense>
                <ScreenSizeInput
                  onChange={onChange}
                  type='form'
                  value={formData.screenSize}
                />
              </Suspense>
            </div>
            <Suspense>
              <div className='grid md:grid-cols-3 grid-flow-row gap-4'>
                <Checkbox
                  label='Tiene Puerto VGA'
                  text='¿Tiene Puerto VGA?'
                  name='hasVGA'
                  value={formData.hasVGA ?? true}
                  handle={(event) => {
                                    const { name, checked } = event.target
                                    onChange(name, checked);
                                }}
                />
                <Checkbox
                  label='Tiene Puerto DVI'
                  text='¿Tiene Puerto DVI?'
                  name='hasDVI'
                  value={formData.hasDVI ?? false}
                  handle={(event) => {
                                    const { name, checked } = event.target
                                    onChange(name, checked);
                                }}
                />
                <Checkbox
                  label='Tiene Puerto HDMI'
                  text='¿Tiene Puerto HDMI?'
                  name='hasHDMI'
                  value={formData.hasHDMI ?? false}
                  handle={(event) => {
                                    const { name, checked } = event.target
                                    onChange(name, checked);
                                }}
                />
              </div>
            </Suspense>
          </>}
      </>
    )
}