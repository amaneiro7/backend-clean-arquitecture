import { type FormEvent, useEffect, useState } from 'react'
import { useGenericFormData } from '../../../Hooks/useGenericFormData'
import { useProcessorForm } from './useHardDriveForm'
import { ProcessorName } from '../../../../modules/devices/fetures/processor/domain/ProcessorName'
import { FormContainer } from '../../../components/formContainer'
import ProcessorNameInput from './HealthInput'

const initialState = {
  name: ''
}

export default function CreateProcessorForm () {
  const { formData, updateForm, resetFrom } = useGenericFormData(initialState)
  const { formStatus, submitForm, resetFormStatus } = useProcessorForm()
  const [errors, setErrors] = useState(initialState)

  useEffect(() => {
    const isName = ProcessorName.isValid(formData.name)

    setErrors({
      name: isName ? '' : ProcessorName.invalidMessage(formData.name)
    })
  }, [formData])

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    const { name } = formData
    await submitForm({ name })
  }

  const handleClose = () => {
    window.history.back()
  }

  const handleChange = (ev: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    updateForm({ [ev.target.name]: ev.target.value })
  }

  return (
    <FormContainer
        title='Agrega un nuevo Dispositivo'
        handleSubmit={handleSubmit}
        handleClose={handleClose}
        isDisabled
    >
      <ProcessorNameInput
          value={formData.name}
          onChange={handleChange}
          errorMessage={errors.name}
      />
    </FormContainer>
  )
}
