import FormInput from '../ui/text-field'
import { useStatus } from '../Hooks/useStatus'
import { Suspense } from 'react'
import { Select } from '../ui/select'
import { FormContainer } from '../components/FormContainer'
import { useEditDevice } from '../Hooks/useEditDevice'
import { type SelectChangeEvent } from '../mui/Select'

function EditDevice () {
  const { device, loading } = useEditDevice()
  const { status } = useStatus()

  const handleInput = (event: SelectChangeEvent<string>): void => {
    console.log(event.target)
  }

  return (
    <FormContainer>
            <form action="submit" className='w-[600px] h-screen flex justify-center border border-secondary'>
                <fieldset className='w-9/12 h-screen flex flex-col gap-5'>
                    <legend>Edita el Dispositivo</legend>
            {loading && '...loading'}
            {!loading && <>
                <FormInput
                        name={'serial'}
                        type='text'
                        label={'serial'}
                        placeholder={'device?.serial'}
                        value={device?.serial}
                        defaultValue={device?.serial}
                    />
                    <FormInput
                        name={'activo'}
                        type='text'
                        label={'activo'}
                        placeholder={device?.activo}
                        value={device?.activo}
                        defaultValue={device?.activo}
                    />
                    <Suspense fallback='...Loading Select Options'>
                        <Select
                            name='status'
                            value={device?.status}
                            label='Estado del Dispositivo'
                            options={status}
                            onChange={handleInput}
                            placeholder='-- Seleccione el Estado --'
                        />

                    </Suspense>
                    <FormInput
                        name={'Modelo'}
                        type='text'
                        label={'Modelo'}
                        placeholder={device?.model.name}
                        value={device?.model.id}
                        defaultValue={device?.model.id}
                    />
            </>
                }
                </fieldset>
            </form>
    </FormContainer>
  )
}

export default EditDevice
