import { useNavigate } from 'react-router-dom'
import { useEmployeeInitialState } from './EmployeeFormInitialState'
import { useGenericFormData } from '../../Hooks/useGenericFormData'
import { FormStatus, useEmployeeForm } from './useEmployeeForm'
import { type FormEvent, Suspense, useEffect } from 'react'
import { FormContainer } from '../../components/formContainer'
import LocationSelect from '../location/LocationSelect'
import EmployeeNameInput from './components/NameInput'
import EmployeeLastNameInput from './components/LastNameInput'
import EmployeeUserNameInput from './components/UserNameInput'
import CedulaInput from './components/Cedula'
import EmployeeEmailInput from './components/EmployeeEmail'
import ExtensionInput from './components/ExtensionInput'
import CargoSelect from '../cargo/CargoSelect'
import VicepresidenciaSelect from '../area/vicepresidencia/VicepresidenciaSelect'
import VicepresidenciaEjecutivaSelect from '../area/vicepresidenciaEjecutivaId/VicepresidenciaEjecutivaSelect'
import GerenciaSelect from '../area/Gerencia/GerenciaSelect'
import CoordinacionSelect from '../area/Coordinacion/CoordinacionSelect'
import PhoneNumberInput from './components/PopneNumberInput'

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
        <EmployeeNameInput
          value={formData.name}
          isForm={true}
          onChange={handleChange}
        />
      </Suspense>
      <Suspense>
        <EmployeeLastNameInput
          value={formData.lastName}
          isForm={true}
          onChange={handleChange}
        />
      </Suspense>
      <Suspense>
        <EmployeeUserNameInput
          value={formData.userName}
          name={formData.name}
          lastName={formData.lastName}
          isForm={true}
          onChange={handleChange}
        />
      </Suspense>
      <Suspense>
        <CedulaInput
          value={formData.cedula}
          isForm={true}
          onChange={handleChange}
        />
      </Suspense>
      <Suspense>
        <LocationSelect
          value={formData.locationId}
          isRequired={true}
          onChange={handleChange}
        />
      </Suspense>
      <Suspense>
        <EmployeeEmailInput
          value={formData.email}
          isForm={true}
          onChange={handleChange}
        />
      </Suspense>
      <Suspense>
        <ExtensionInput
          value={formData.extension}
          isForm={true}
          onChange={handleChange}
        />
      </Suspense>
      <Suspense>
        <PhoneNumberInput
          value={formData.phoneNumber}
          isForm={true}
          onChange={handleChange}
        />
      </Suspense>
      <Suspense>
        <CargoSelect
          value={formData.cargoId}
          onChange={handleChange}
          isRequired={true}
        />
      </Suspense>
      <Suspense>
        <VicepresidenciaEjecutivaSelect
          value={formData.vicepresidenciaEjecutivaId}
          isRequired={true}
          onChange={handleChange}
        />
      </Suspense>
      <Suspense>
        <VicepresidenciaSelect
          value={formData.vicepresidenciaId}
          vicepresidenciaEjecutivaId={formData.vicepresidenciaEjecutivaId}
          isRequired={true}
          onChange={handleChange}
        />
      </Suspense>
      <Suspense>
        <GerenciaSelect
          value={formData.gerenciaId}
          vicepresidenciaId={formData.vicepresidenciaId}
          isRequired={true}
          onChange={handleChange}
        />
      </Suspense>
      <Suspense>
        <CoordinacionSelect
          value={formData.coordinacionId}
          gerenciaId={formData.gerenciaId}
          isRequired={true}
          onChange={handleChange}
        />
      </Suspense>
    </FormContainer>
  )
}
