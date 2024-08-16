import { lazy, Suspense } from 'react'
import { useLocation } from 'react-router-dom'
import { InputSkeletonLoading } from '../../components/skeleton/inputSkeletonLoading'
import { FormStatus } from '../../Hooks/useGenericForm'
import { useFormDevice } from './useFormDevice'


const FormContainer = lazy(async () => await import('../../components/formContainer/formContainer'))
const DeviceSearchComboBox = lazy(async () => import('../../components/combo_box/DeviceSearchComboBox'))
const SerialInput = lazy(async () => await import('../../components/text-inputs/SerialInput'))
const ActivoInput = lazy(async () => await import('../../components/text-inputs/ActivoInput'))
const ObservationInput = lazy(async () => await import('../../components/text-inputs/ObservationInput'))
const StatusComboBox = lazy(async () => await import('../../components/combo_box/StatusComboBox'))
const EmployeeComboBox = lazy(async () => await import('../../components/combo_box/EmployeeComboBox'))
const BrandComboBox = lazy(async () => await import('../../components/combo_box/BrandComboBox'))
const CategoryComboBox = lazy(async () => await import('../../components/combo_box/CategoryComboBox'))
const LocationComboBox = lazy(async () => await import('../../components/combo_box/LocationComboBox'))
const ModelComboBox = lazy(async () => await import('../../components/combo_box/ModelComboBox'))
const StockNumberInput = lazy(async () => import('../../components/text-inputs/StockNumberInput').then(m => ({ default: m.StockNumberInput})))
const DeviceFeatures = lazy(async () => await import('./DeviceFeatures'))

export default function CreateDeviceForm() {
  const location = useLocation()
  const { handleChange, handleClose, handleSubmit, isAddForm, formData, formStatus } = useFormDevice()

  return (
    <FormContainer
      key={location.key}
      title='Dispositivo'
      description='Ingrese los datos del dispositivo.'
      isAddForm={isAddForm}
      handleSubmit={handleSubmit}
      handleClose={handleClose}
      isDisabled={formStatus === FormStatus.Loading}
      lastUpdated={formData.updatedAt}
      updatedBy={formData.history}
      url='/device/add'
      searchInput={<DeviceSearchComboBox />}
    >
      <div className='grid grid-cols-[repeat(auto-fit,minmax(450px,1fr))] gap-4'>
        <Suspense fallback={<InputSkeletonLoading />}>
          <StatusComboBox
            value={formData.statusId}
            onChange={handleChange}
            type='form'
          />
        </Suspense>        
        <Suspense fallback={<InputSkeletonLoading />}>
          <CategoryComboBox
            value={formData.categoryId}
            onChange={handleChange}
            type='form'
            isAdd={isAddForm}
          />
        </Suspense>
        <Suspense fallback={<InputSkeletonLoading />}>
          <BrandComboBox
            value={formData.brandId}
            onChange={handleChange}
            categoryId={formData.categoryId}
            type='form'
            isAdd={isAddForm}
          />
        </Suspense>
        <Suspense fallback={<InputSkeletonLoading />}>
          <ModelComboBox
            value={formData.modelId}
            onChange={handleChange}
            categoryId={formData.categoryId}
            brandId={formData.brandId}
            type='form'
            isAdd={isAddForm}
          />
        </Suspense>
        <Suspense fallback={<InputSkeletonLoading />}>
          <SerialInput
            value={formData.serial}
            onChange={handleChange}
            type='form'
            isAdd={isAddForm}
          />
        </Suspense>
        <Suspense fallback={<InputSkeletonLoading />}>
          <ActivoInput
            value={formData.activo}
            onChange={handleChange}
            isForm
          />
        </Suspense>        
        <Suspense fallback={<InputSkeletonLoading />}>
          <EmployeeComboBox
            onChange={handleChange}
            name='employeeId'
            type='form'
            status={formData.statusId}
            value={formData.employeeId}
          />
        </Suspense>
        <div className='flex gap-5 col-span-2'>
          <Suspense fallback={<InputSkeletonLoading />}>
            <LocationComboBox
              onChange={handleChange}
              value={formData.locationId}
              statusId={formData.statusId}
              type='form'
            />
          </Suspense>
          <Suspense fallback={<InputSkeletonLoading />}>
            <StockNumberInput
              onChange={handleChange}
              value={formData.stockNumber}
              status={formData.statusId}
              type='form'
            />
          </Suspense>
        </div>        
        <Suspense fallback={<InputSkeletonLoading />}>
          <ObservationInput
            onChange={handleChange}
            value={formData.observation}
          />
        </Suspense>
      </div>
      <div className='grid grid-cols-[repeat(auto-fit,minmax(450px,1fr))] gap-4'>
        <DeviceFeatures
          formData={formData}
          onChange={handleChange}
        />
      </div>
          
          
    </FormContainer>
  )
}
