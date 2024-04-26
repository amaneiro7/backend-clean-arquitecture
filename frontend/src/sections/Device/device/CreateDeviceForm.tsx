import { type FormEvent, useEffect, lazy, Suspense } from 'react'
import { useDeviceForm, FormStatus } from './useDeviceForm'
import { useDeviceInitialState } from './DeviceFormInitialState'
import { useGenericFormData } from '../../Hooks/useGenericFormData'
import { FormContainer } from '../../components/formContainer'
import { InputSkeletonLoading } from '../../components/Loading/inputSkeletonLoading'

const CategorySelect = lazy(async () => await import('../../components/Select/CategorySelect'))
const BrandSelect = lazy(async () => await import('../../components/Select/BrandSelect'))
const SerialInput = lazy(async () => await import('./components/SerialInput'))
const ActivoInput = lazy(async () => await import('./components/ActivoInput'))
const StatusSelect = lazy(async () => await import('../status/StatusSelect'))
const ModelSelect = lazy(async () => await import('../../components/Select/ModelSelect'))
const ObservationInput = lazy(async () => await import('./components/ObservationInput'))
const LocationSelect = lazy(async () => await import('../../components/Select/LocationSelect'))
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
        <Suspense fallback={<InputSkeletonLoading />}>
          <CategorySelect
            value={formData.categoryId}
            onChange={handleChange}
            isRequired={true}
          />
        </Suspense>
        <Suspense fallback={<InputSkeletonLoading />}>
          <BrandSelect
            value={formData.brandId}
            onChange={handleChange}
            categoryId={formData.categoryId}
            isRequired={true}
          />
        </Suspense>
        <div className='flex gap-4'>
          <Suspense fallback={<InputSkeletonLoading />}>
            <SerialInput
                value={formData.serial}
                onChange={handleChange}
                isForm={true}
            />
          </Suspense>
          <Suspense fallback={<InputSkeletonLoading />}>
            <ActivoInput
                value={formData.activo}
                onChange={handleChange}
                isForm={true}
              />
          </Suspense>
        </div>
        <Suspense fallback={<InputSkeletonLoading />}>
          <StatusSelect
              value={formData.statusId}
              onChange={handleChange}
              isRequired={true}
            />
          </Suspense>
        <Suspense fallback={<InputSkeletonLoading />}>
          <ModelSelect
            value={formData.modelId}
            onChange={handleChange}
            categoryId={formData.categoryId}
            brandId={formData.brandId}
            isRequired={true}
          />
        </Suspense>
        <Suspense fallback={<InputSkeletonLoading />}>
          <EmployeeComboBox
            onChange={handleChange}
            type='form'
            status={formData.statusId}
            value={formData.employeeId}
          />
        </Suspense>

        <Suspense fallback={<InputSkeletonLoading />}>
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
