import { lazy, Suspense, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useEmployeeInitialState } from './EmployeeFormInitialState'
import { useGenericFormData } from '../../Hooks/useGenericFormData'
import { FormStatus, useEmployeeForm } from './useEmployeeForm'
import { InputSkeletonLoading } from '../../components/skeleton/inputSkeletonLoading'
import { useEmployee } from './useEmployee'
import { useAppContext } from '../../Context/AppContext'
import Main from '../../components/Main'
import { InfoBox } from '../../components/info-box/InfoBox'
import { InfoBoxTitle } from '../../components/info-box/InfoBoxTitle'
import { InfoBoxText } from '../../components/info-box/InfoBoxText'

const FormContainer = lazy(async () => await import('../../components/formContainer'))
const EmployeeUserNameInput = lazy(async () => await import('../../components/text-inputs/UserNameInput'))

export default function CreateEmployeeForm() {
  const navigate = useNavigate()
  const { repository } = useAppContext()
  const { createEmployee } = useEmployee(repository)
  const { preloadedEmployeeState } = useEmployeeInitialState()
  const { formData, resetForm, updateForm } = useGenericFormData(preloadedEmployeeState)
  const { formStatus, resetFormStatus, submitForm } = useEmployeeForm({ createEmployee })

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
    event.stopPropagation()
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
          lastUpdated={formData.updatedAt}
        >
          <Suspense fallback={<InputSkeletonLoading />}>
            <EmployeeUserNameInput
              value={formData.userName}
              type='form'
              onChange={handleChange}
            />
          </Suspense>
        {formData.devices.length > 0 &&
          formData.devices.map(({id, category,brand, model, serial, location, computer}) =>
            (
              <Suspense key={id}>
                <InfoBox>
                  <InfoBoxTitle title={category?.name} />
                  <InfoBoxText desc='Marca' text={brand?.name}/>
                  <InfoBoxText desc='Modelo' text={model?.name}/>
                  <InfoBoxText desc='Serial' text={serial}/>
                  <InfoBoxText desc='Ubicación' text={location?.name}/>
                  {computer !== null && <InfoBoxText desc='Dirección IP' text={computer?.ipAddress}/>}
                </InfoBox>
              </Suspense>
            )
          )}
        </FormContainer>
      </Main>
    </Suspense>
  )
}
