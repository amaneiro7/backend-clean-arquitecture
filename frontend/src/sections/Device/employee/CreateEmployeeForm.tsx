import { lazy, Suspense, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useEmployeeInitialState } from './EmployeeFormInitialState'
import { useGenericFormData } from '../../Hooks/useGenericFormData'
import { FormStatus, useEmployeeForm } from './useEmployeeForm'
import { InputSkeletonLoading } from '../../components/skeleton/inputSkeletonLoading'
import { useEmployee } from './useEmployee'
import { useAppContext } from '../../Context/AppContext'
import Main from '../../components/Main'

const FormContainer = lazy(async () => await import('../../components/formContainer'))
const EmployeeUserNameInput = lazy(async () => await import('../../components/text-inputs/UserNameInput'))

export default function CreateEmployeeForm() {
  const navigate = useNavigate()  
  const {repository} = useAppContext()
  const { createEmployee } = useEmployee(repository)
  const { preloadedEmployeeState } = useEmployeeInitialState()
  const { formData, resetForm, updateForm } = useGenericFormData(preloadedEmployeeState)
  const { formStatus, resetFormStatus, submitForm } = useEmployeeForm({createEmployee})

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
      <Main>
        <FormContainer
          title='Empleado'
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
      </Main>
    </Suspense>
  )
}
