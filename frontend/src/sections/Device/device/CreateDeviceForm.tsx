import { type FormEvent, useEffect, lazy, Suspense } from 'react'
import { useDeviceForm, FormStatus } from './useDeviceForm'
import { useDeviceInitialState } from './DeviceFormInitialState'
import { useGenericFormData } from '../../Hooks/useGenericFormData'
import { FormContainer } from '../../components/formContainer'
import ObservationInput from './components/ObservationInput'
import LocationSelect from '../location/LocationSelect'
import { EmployeeSelect } from '../employee/components/EmployeeSelect'
import ComboBox from '../../components/combo_box/combo_box'
import EmployeeComboBox from '../../components/combo_box/EmployeeComboBox'

const CategorySelect = lazy(async () => await import('../category/CategorySelect'))
const BrandSelect = lazy(async () => await import('../brand/BrandSelect'))
const SerialInput = lazy(async () => await import('./components/SerialInput'))
const ActivoInput = lazy(async () => await import('./components/ActivoInput'))
const StatusSelect = lazy(async () => await import('../status/StatusSelect'))
const ModelSelect = lazy(async () => await import('../model/ModelSelect'))
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
        <Suspense>
          <CategorySelect
            value={formData.categoryId}
            onChange={handleChange}
            isRequired={true}
          />
        </Suspense>
        <Suspense>
          <BrandSelect
            value={formData.brandId}
            onChange={handleChange}
            categoryId={formData.categoryId}
            isRequired={true}
          />
        </Suspense>
        <div className='flex gap-4'>
          <Suspense>
            <SerialInput
                value={formData.serial}
                onChange={handleChange}
                isForm={true}
            />
          </Suspense>
          <Suspense>
            <ActivoInput
                value={formData.activo}
                onChange={handleChange}
                isForm={true}
              />
          </Suspense>
        </div>
        <Suspense>
          <StatusSelect
              value={formData.statusId}
              onChange={handleChange}
              isRequired={true}
            />
          </Suspense>
        <Suspense>
          <ModelSelect
            value={formData.modelId}
            onChange={handleChange}
            categoryId={formData.categoryId}
            brandId={formData.brandId}
            isRequired={true}
          />
        </Suspense>

        {/* <EmployeeSelect
          onChange={handleChange}
          value={formData.employeeId}
          isForm={true}
          status={formData.statusId}
        /> */}
        <EmployeeComboBox
          onChange={handleChange}
          type='form'
          status={formData.statusId}
          value={formData.employeeId}
         />

        <Suspense>
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
