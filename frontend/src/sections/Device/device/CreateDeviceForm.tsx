import { type FormEvent, useEffect, lazy, Suspense } from 'react'
import { useDeviceForm, FormStatus } from './useDeviceForm'
import { useDeviceInitialState } from './DeviceFormInitialState'
import { useGenericFormData } from '../../Hooks/useGenericFormData'
import { FormContainer } from '../../components/formContainer'
import { InputSkeletonLoading } from '../../components/Loading/inputSkeletonLoading'

// const CategorySelect = lazy(async () => await import('../../components/Select/CategorySelect'))
// const BrandSelect = lazy(async () => await import('../../components/Select/BrandSelect'))
const SerialInput = lazy(async () => await import('./components/SerialInput'))
const ActivoInput = lazy(async () => await import('./components/ActivoInput'))
const StatusSelect = lazy(async () => await import('../status/StatusSelect'))
// const ModelSelect = lazy(async () => await import('../../components/Select/ModelSelect'))
const ObservationInput = lazy(async () => await import('./components/ObservationInput'))
// const LocationSelect = lazy(async () => await import('../../components/Select/LocationSelect'))
const EmployeeComboBox = lazy(async () => await import('../../components/combo_box/EmployeeComboBox'))
const BrandComboBox = lazy(async () => await import('../../components/combo_box/BrandComboBox'))
const CategoryComboBox = lazy(async () => await import('../../components/combo_box/CategoryComboBox'))
const LocationComboBox = lazy(async () => await import('../../components/combo_box/LocationComboBox'))
const ModelComboBox = lazy(async () => await import('../../components/combo_box/ModelComboBox'))
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
          <CategoryComboBox
            value={formData.categoryId}
            onChange={handleChange}
            type='form'
          />
        </Suspense>
        <Suspense fallback={<InputSkeletonLoading />}>
          <BrandComboBox
            value={formData.brandId}
            onChange={handleChange}
            categoryId={formData.categoryId}
            type='form'
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
          <ModelComboBox
            value={formData.modelId}
            onChange={handleChange}
            categoryId={formData.categoryId}
            brandId={formData.brandId}
            type='form'
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
        <LocationComboBox
          onChange={handleChange}
          value={formData.locationId}
          statusId={formData.statusId}
          type='form'
        />
        <ObservationInput onChange={handleChange} value={formData.observation}/>
      </FormContainer>

  )
}
