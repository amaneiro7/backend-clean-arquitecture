import { type FormEvent, useEffect, lazy, Suspense } from 'react'
import { useDeviceForm, FormStatus } from './useDeviceForm'
import { useDeviceInitialState } from './DeviceFormInitialState'
import { useGenericFormData } from '../../Hooks/useGenericFormData'
import { FormContainer } from '../../components/formContainer'
import { InputLoading } from '../../components/Loading/inputLoading'

const CategorySelect = lazy(async () => await import('../category/CategorySelect'))
const BrandSelect = lazy(async () => await import('../brand/BrandSelect'))
const SerialInput = lazy(async () => await import('./components/SerialInput'))
const ActivoInput = lazy(async () => await import('./components/ActivoInput'))
const StatusSelect = lazy(async () => await import('../status/StatusSelect'))
const ModelSelect = lazy(async () => await import('../model/ModelSelect'))
const ObservationInput = lazy(async () => await import('./components/ObservationInput'))
const LocationSelect = lazy(async () => await import('../location/LocationSelect'))
const EmployeeComboBox = lazy(async () => await import('../../components/combo_box/EmployeeComboBox'))
const DeviceFeatures = lazy(async () => await import('./components/DeviceFeatures'))

export default function CreateDeviceForm () {
  const { preloadedDeviceState } = useDeviceInitialState()
  const { formData, updateForm, resetForm } = useGenericFormData(preloadedDeviceState)
  const { formStatus, submitForm, resetFormStatus } = useDeviceForm()

  useEffect(() => {
    updateForm(preloadedDeviceState)
    return () => {
      resetForm()
    }
  }, [preloadedDeviceState])

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
    window.history.back()
  }

  const handleChange = (name: string, value: string) => {
    updateForm({ [name]: value })
  }

  return (
      <FormContainer
          title='Agrega un nuevo Dispositivo'
          handleSubmit={handleSubmit}
          handleClose={handleClose}
          isDisabled={formStatus === FormStatus.Loading}
      >
        <Suspense fallback={<InputLoading />}>
          <CategorySelect
            value={formData.categoryId}
            onChange={handleChange}
            isRequired={true}
          />
        </Suspense>
        <Suspense fallback={<InputLoading />}>
          <BrandSelect
            value={formData.brandId}
            onChange={handleChange}
            categoryId={formData.categoryId}
            isRequired={true}
          />
        </Suspense>
        <div className='flex gap-4'>
          <Suspense fallback={<InputLoading />}>
            <SerialInput
                value={formData.serial}
                onChange={handleChange}
                isForm={true}
            />
          </Suspense>
          <Suspense fallback={<InputLoading />}>
            <ActivoInput
                value={formData.activo}
                onChange={handleChange}
                isForm={true}
              />
          </Suspense>
        </div>
        <Suspense fallback={<InputLoading />}>
          <StatusSelect
              value={formData.statusId}
              onChange={handleChange}
              isRequired={true}
            />
          </Suspense>
        <Suspense fallback={<InputLoading />}>
          <ModelSelect
            value={formData.modelId}
            onChange={handleChange}
            categoryId={formData.categoryId}
            brandId={formData.brandId}
            isRequired={true}
          />
        </Suspense>
        <Suspense fallback={<InputLoading />}>
          <EmployeeComboBox
            onChange={handleChange}
            type='form'
            status={formData.statusId}
            value={formData.employeeId}
          />
        </Suspense>

        <Suspense fallback={<InputLoading />}>
          <DeviceFeatures
            formData={formData}
            onChange={handleChange}
          />
        </Suspense>
        <LocationSelect
          onChange={handleChange}
          value={formData.locationId}
          isRequired={true}
          isForm={true}
          statusId={formData.statusId}
        />
        <ObservationInput onChange={handleChange} value={formData.observation}/>
      </FormContainer>

  )
}
