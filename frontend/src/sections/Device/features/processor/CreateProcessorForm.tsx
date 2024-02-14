import { type FormEvent, useEffect } from 'react'
import { useGenericFormData } from '../../../Hooks/useGenericFormData'
import { FormStatus, useProcessorForm } from './useProcessorForm'
import { FormContainer } from '../../../components/formContainer'
import ProcessorNameInput from './ProcessorNameInput'
import { useProcessorInitialState } from './ProcessorFormInitialState'

const initialState = {
  name: ''
}

export default function CreateProcessorForm () {
  const { id: processorId, preloadedProcessorState } = useProcessorInitialState()
  const { formData, updateForm, resetForm } = useGenericFormData(initialState)
  const { formStatus, submitForm, resetFormStatus } = useProcessorForm()

  useEffect(() => {
    updateForm(preloadedProcessorState)

    return () => {
      resetForm()
    }
  }, [preloadedProcessorState])

  useEffect(() => {
    if (formStatus === FormStatus.Success) {
      resetFormStatus()
      resetForm()
      handleClose()
    }
    if (formStatus === FormStatus.Error) {
      resetFormStatus()
    }
  }, [formStatus])
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    const { name } = formData
    await submitForm({ id: processorId, name })
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
        isDisabled={formStatus === FormStatus.Loading}
    >
      <ProcessorNameInput
          value={formData.name}
          onChange={handleChange}
          isRequired={true}
      />
    </FormContainer>
  )
}
