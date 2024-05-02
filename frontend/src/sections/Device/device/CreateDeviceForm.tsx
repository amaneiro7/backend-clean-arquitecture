import { type FormEvent, useEffect, lazy, Suspense, useLayoutEffect } from 'react'
import { useDeviceForm, FormStatus } from './useDeviceForm'
import { useDeviceInitialState } from './DeviceFormInitialState'
import { useGenericFormData } from '../../Hooks/useGenericFormData'
import { InputSkeletonLoading } from '../../components/skeleton/inputSkeletonLoading'
import Main from '../../components/Main'

const FormContainer = lazy(async () => await import('../../components/formContainer'))
const SerialInput = lazy(async () => await import('../../components/text-inputs/SerialInput'))
const ActivoInput = lazy(async () => await import('../../components/text-inputs/ActivoInput'))
const ObservationInput = lazy(async () => await import('../../components/text-inputs/ObservationInput'))
const StatusComboBox = lazy(async () => await import('../../components/combo_box/StatusComboBox'))
const EmployeeComboBox = lazy(async () => await import('../../components/combo_box/EmployeeComboBox'))
const BrandComboBox = lazy(async () => await import('../../components/combo_box/BrandComboBox'))
const CategoryComboBox = lazy(async () => await import('../../components/combo_box/CategoryComboBox'))
const LocationComboBox = lazy(async () => await import('../../components/combo_box/LocationComboBox'))
const ModelComboBox = lazy(async () => await import('../../components/combo_box/ModelComboBox'))
const DeviceFeatures = lazy(async () => await import('./components/DeviceFeatures'))

export default function CreateDeviceForm() {
  const { preloadedDeviceState, setResetState } = useDeviceInitialState()
  const { formData, updateForm, resetForm } = useGenericFormData(preloadedDeviceState)
  const { formStatus, submitForm, resetFormStatus } = useDeviceForm()

  useEffect(() => {
    updateForm(preloadedDeviceState)
    return () => {      
      resetForm()
    }
  }, [preloadedDeviceState])

  useLayoutEffect(() => {
    if (formStatus === FormStatus.Success) {
      setResetState(formData)
      resetFormStatus()
      resetForm()
    }
    if (formStatus === FormStatus.Error) {
      resetFormStatus()
    }
  }, [formStatus])

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    event.stopPropagation()
    await submitForm(formData)
  }

  const handleClose = () => {
    window.history.back()
  }

  const handleChange = (name: string, value: string) => {
    updateForm({ [name]: value })
  }

  return (
    <Main>
      <Suspense>
        <FormContainer
          title='Dispositivo'
          handleSubmit={handleSubmit}
          handleClose={handleClose}
          isDisabled={formStatus === FormStatus.Loading}
          lastUpdated={formData.updatedAt}
        >
          <div className='flex gap-4'>
            <Suspense fallback={<InputSkeletonLoading />}>
              <CategoryComboBox
                value={formData.categoryId}
                onChange={handleChange}
                type='form'
              />
            </Suspense>
            <Suspense fallback={<InputSkeletonLoading />}>
              <StatusComboBox
                value={formData.statusId}
                onChange={handleChange}
                type='form'
              />
            </Suspense>

          </div>
          <div className='flex gap-4'>
            <Suspense fallback={<InputSkeletonLoading />}>
              <BrandComboBox
                value={formData.brandId}
                onChange={handleChange}
                categoryId={formData.categoryId}
                type='form'
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

          </div>
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
              <LocationComboBox
                onChange={handleChange}
                value={formData.locationId}
                statusId={formData.statusId}
                type='form'
              />
            </Suspense>
          <div className='flex gap-4'>
            <Suspense fallback={<InputSkeletonLoading />}>
              <EmployeeComboBox
                onChange={handleChange}
                name='employeeId'
                type='form'
                status={formData.statusId}
                value={formData.employeeId}
              />
            </Suspense>
            <Suspense fallback={<InputSkeletonLoading />}>
              <ObservationInput
                onChange={handleChange}
                value={formData.observation} />
            </Suspense>
          </div>
          <Suspense>
            <DeviceFeatures
              formData={formData}
              onChange={handleChange}
            />
          </Suspense>
        </FormContainer>
      </Suspense>
    </Main>
  )
}
