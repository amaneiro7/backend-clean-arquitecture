import { lazy, Suspense, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useEmployee } from '../../Hooks/employee/useEmployee'
import { useEmployeeInitialState } from '../../Hooks/employee/EmployeeFormInitialState'
import { useGenericFormData } from '../../Hooks/useGenericFormData'
import { InputSkeletonLoading } from '../../components/skeleton/inputSkeletonLoading'
import { FormStatus, useGenericForm } from '../../Hooks/useGenericForm'

const InfoBox = lazy(async () => import('../../components/info-box/InfoBox').then(m => ({ default: m.InfoBox })))
const InfoBoxTitle = lazy(async () => import('../../components/info-box/InfoBoxTitle').then(m => ({ default: m.InfoBoxTitle })))
const InfoBoxText = lazy(async () => import('../../components/info-box/InfoBoxText').then(m => ({ default: m.InfoBoxText })))
const EmployeeSearchComboBox = lazy(async () => import('../../components/combo_box/EmployeeSearchComboBox').then(m => ({default: m.EmployeeSearchComboBox})))
const FormContainer = lazy(async () => await import('../../components/formContainer/formContainer'))
const EmployeeUserNameInput = lazy(async () => await import('../../components/text-inputs/UserNameInput').then(m => ({ default: m.EmployeeUserNameInput })))

export default function CreateEmployeeForm() {
  const navigate = useNavigate()
  const location = useLocation()
  const { createEmployee } = useEmployee()
  const { preloadedEmployeeState, isAddForm } = useEmployeeInitialState()
  const { formData, resetForm, updateForm } = useGenericFormData(preloadedEmployeeState)
  const { formStatus, resetFormStatus, submitForm } = useGenericForm({ create: createEmployee })

  useEffect(() => {
    updateForm(preloadedEmployeeState)
    return () => {
      resetForm()
    }
  }, [preloadedEmployeeState, resetForm, updateForm])

  useEffect(() => {
    if (formStatus === FormStatus.Success) {
      resetFormStatus()
      resetForm()
    }
    if (formStatus === FormStatus.Error) {
      resetFormStatus()
    }
  }, [formStatus, resetForm, resetFormStatus])

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
    <FormContainer
      key={location.key}
      title='Empleado'
      description='Ingrese los datos del usuario el cual desea registar.'
      isAddForm={isAddForm}
      handleSubmit={handleSubmit}
      handleClose={handleClose}
      isDisabled={formStatus === FormStatus.Loading}
      lastUpdated={formData.updatedAt}
      url='/employee/add'
      searchInput={<EmployeeSearchComboBox />}
    >
      <Suspense fallback={<InputSkeletonLoading />}>
        <EmployeeUserNameInput
          key={location.key}
          value={formData.userName}
          type='form'
          onChange={handleChange}
        />
      </Suspense>
      {formData.devices.length > 0 &&
            formData.devices.map(({ id, category, brand, model, serial, location, computer }) =>
            (
              <Suspense key={id}>
                <InfoBox>
                  <InfoBoxTitle title={category?.name} url={`/device/edit/${id}`} />
                  <InfoBoxText desc='Marca' text={brand?.name} />
                  <InfoBoxText desc='Modelo' text={model?.name} />
                  <InfoBoxText desc='Serial' text={serial} />
                  <InfoBoxText desc='Ubicación' text={location?.name} />
                  {computer !== null && <InfoBoxText desc='Dirección IP' text={computer?.ipAddress} />}
                </InfoBox>
              </Suspense>
            )
            )}
    </FormContainer>
  )
}
