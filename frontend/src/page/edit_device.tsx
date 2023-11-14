import { useParams } from 'react-router-dom'
import { useDeviceId } from '../Hooks/useDeviceId'
import FormInput from '../ui/text-field'
import { type Device } from '../types/types'
import { useStatus } from '../Hooks/useStatus'

function EditDevice () {
  const { deviceId } = useParams()

  const { device, error } = useDeviceId({ deviceId })
  const { status } = useStatus()

  return (
        <div
            className='grid place-content-center gap-2 max-w-2xl'
        >
            <h1>EditProfile</h1>
            <form
                action="submit"
                className='w-full h-screen flex flex-col gap-4'
            >
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
                <select name='status'>
                    {status.map((item, index) => (
                        <option key={`${index}_${index}`} value={item}>{item}</option>
                    ))

                    }
                </select>
                <FormInput
                    name={'Modelo'}
                    type='text'
                    label={'Modelo'}
                    // placeholder={device?.model.name}
                    defaultValue={device?.model.id}
                />

            </form>
        </div>
  )
}

export default EditDevice
