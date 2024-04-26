import { useNavigate } from 'react-router-dom'
import { useEmployeeInitialState } from './EmployeeFormInitialState'
import { useGenericFormData } from '../../Hooks/useGenericFormData'
import { FormStatus, useEmployeeForm } from './useEmployeeForm'
import { type FormEvent, Suspense, useEffect } from 'react'
import { FormContainer } from '../../components/formContainer'
import EmployeeUserNameInput from '../../components/text-inputs/UserNameInput'

export default function CreateEmployeeForm () {
  const navigate = useNavigate()
  const { preloadedEmployeeState } = useEmployeeInitialState()
  const { formData, resetForm, updateForm } = useGenericFormData(preloadedEmployeeState)
  const { formStatus, resetFormStatus, submitForm } = useEmployeeForm()

  useEffect(() => {
    updateForm(preloadedEmployeeState)
    return () => {
      resetForm()
    }
  }, [preloadedEmployeeState])

  useEffect(() => {
    if (formStatus === FormStatus.Success) {
      resetFormStatus()
      resetForm()
    }
    if (formStatus === FormStatus.Error) {
      resetFormStatus()
    }
  }, [formStatus])

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    await submitForm(formData)
  }

  const handleClose = () => {
    navigate('/')
  }

  const handleChange = (name: string, value: string) => {
    updateForm({ [name]: value })
  }

  return (
    <FormContainer
      title='Agrega un nuevo Empleado'
      handleSubmit={handleSubmit}
      handleClose={handleClose}
      isDisabled={formStatus === FormStatus.Loading}
    >
      <Suspense>
        <EmployeeUserNameInput
          value={formData.userName}
          type='form'
          onChange={handleChange}
        />
      </Suspense>
    </FormContainer>
  )
}
