import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useDeviceId } from '../Hooks/useDeviceId'
import FormInput from '../ui/text-field'
import { type Device } from '../types/types'
import { useStatus } from '../Hooks/useStatus'
import { FormContainer } from '../components/FormContainer'
import { Suspense } from 'react'
import { Select } from '../ui/select'

function EditDevice () {
  const { deviceId } = useParams()
  const location = useLocation()
  const navigate = useNavigate()

  const { device, error } = useDeviceId({ deviceId })
  const { status } = useStatus()

  const handleInput = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    console.log(event.target)
  }

  return (
    <FormContainer>
            <form action="submit" >
                <fieldset className='w-full h-screen flex flex-col gap-5'>
                    <legend>Edita el Dispositivo</legend>
                <FormInput
                    name={'serial'}
                    type='text'
                    label={'serial'}
                    // placeholder={device?.serial}
                    defaultValue={device?.serial}
                />
                <FormInput
                    name={'activo'}
                    type='text'
                    label={'activo'}
                    // placeholder={device?.activo}
                    defaultValue={device?.activo}
                />
                <Suspense fallback='...Loading Select Options'>
                    <div>
                        <label htmlFor="Status">Estado del Dispositivo</label>
                        <Select
                            name='status'
                            value={device?.status}
                            options={status}
                            onChange={handleInput}
                            placeholder='-- Seleccione el Estado --'
                            isDisabled={false}
                            isAutoFocus={false}
                        />
                    </div>
                </Suspense>
                <FormInput
                    name={'Modelo'}
                    type='text'
                    label={'Modelo'}
                    // placeholder={device?.model.name}
                    defaultValue={device?.model.id}
                />
                </fieldset>
            </form>
    </FormContainer>
  )
}

export default EditDevice
