import { lazy, Suspense, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useEmployeeInitialState } from './EmployeeFormInitialState'
import { useGenericFormData } from '../../Hooks/useGenericFormData'
import { FormStatus, useEmployeeForm } from './useEmployeeForm'
import { InputSkeletonLoading } from '../../components/Loading/inputSkeletonLoading'

const FormContainer = lazy(async () => await import('../../components/formContainer'))
const EmployeeUserNameInput = lazy(async () => await import('../../components/text-inputs/UserNameInput'))

export default function CreateEmployeeForm() {
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

  const handleSubmit = async (event: React.FormEvent) => {
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
    <Suspense>

      <FormContainer
        title='Agrega un nuevo Empleado'
        handleSubmit={handleSubmit}
        handleClose={handleClose}
        isDisabled={formStatus === FormStatus.Loading}
      >
        <Suspense fallback={<InputSkeletonLoading />}>
          <EmployeeUserNameInput
            value={formData.userName}
            type='form'
            onChange={handleChange}
          />
        </Suspense>
      </FormContainer>
    </Suspense>
  )
}
