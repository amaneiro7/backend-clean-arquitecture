import { lazy, Suspense } from 'react'
import { InputSkeletonLoading } from '@/sections/components/skeleton/inputSkeletonLoading'
import { type Primitives } from '@/modules/shared/domain/value-object/Primitives'
import { type StatusId } from '@/modules/devices/devices/status/domain/StatusId'
import { type CategoryId } from '@/modules/devices/category/domain/CategoryId'
import { type BrandId } from '@/modules/devices/brand/domain/BrandId'
import { type ModelId } from '@/modules/devices/model/model/domain/ModelId'
import { type DeviceSerial } from '@/modules/devices/devices/devices/domain/DeviceSerial'
import { type DeviceActivo } from '@/modules/devices/devices/devices/domain/DeviceActivo'
import { type DeviceEmployee } from '@/modules/devices/devices/devices/domain/DeviceEmployee'
import { type DeviceLocation } from '@/modules/devices/devices/devices/domain/DeviceLocation'
import { type DeviceStockNumber } from '@/modules/devices/devices/devices/domain/DeviceStockNumber'
import { type DeviceObservation } from '@/modules/devices/devices/devices/domain/DeviceObservation'
import { type FormDeviceDisabled, type FormDeviceErrors, type FormDeviceRequired } from '@/sections/Hooks/device/DefaultInitialState'

const StatusComboBox = lazy(async () => await import('@/sections/components/combo_box/StatusComboBox'))
const CategoryComboBox = lazy(async () => await import('@/sections/components/combo_box/CategoryComboBox'))
const BrandComboBox = lazy(async () => await import('@/sections/components/combo_box/BrandComboBox'))
const ModelComboBox = lazy(async () => await import('@/sections/components/combo_box/ModelComboBox'))
const SerialInput = lazy(async () => await import('@/sections/components/text-inputs/SerialInput'))
const ActivoInput = lazy(async () => await import('@/sections/components/text-inputs/ActivoInput'))
const EmployeeComboBox = lazy(async () => await import('@/sections/components/combo_box/EmployeeComboBox'))
const LocationComboBox = lazy(async () => await import('@/sections/components/combo_box/LocationComboBox'))
const ObservationInput = lazy(async () => await import('@/sections/components/text-inputs/ObservationInput'))
const StockNumberInput = lazy(async () => import('@/sections/components/text-inputs/StockNumberInput').then(m => ({ default: m.StockNumberInput})))

export function MainFormInputs({
    statusId,
    categoryId,
    brandId,    
    modelId,        
    serial,
    activo,    
    employeeId,
    locationId,    
    stockNumber,    
    observation,
    isAddForm,
    errors,
    required,
    disabled,
    handleChange,
    handleModel,
    handleLocation
}: {
    statusId: Primitives<StatusId>
    categoryId: Primitives<CategoryId>
    brandId: Primitives<BrandId>
    modelId: Primitives<ModelId>
    serial: Primitives<DeviceSerial>
    activo: Primitives<DeviceActivo>
    employeeId: Primitives<DeviceEmployee>
    locationId: Primitives<DeviceLocation>
    stockNumber: Primitives<DeviceStockNumber>
    observation: Primitives<DeviceObservation>
    errors: FormDeviceErrors,
    required: FormDeviceRequired,
    disabled: FormDeviceDisabled,
    isAddForm: boolean
    handleChange: (name: string, value: string) => void
    handleModel: ({ value, memoryRamSlotQuantity, memoryRamType }: { value: string; memoryRamSlotQuantity?: number; memoryRamType?: string }) => void
    handleLocation: ({ value, typeOfSiteId }: { value: string; typeOfSiteId?: string }) => void
}) {
  return (
    <div className='grid grid-cols-[repeat(auto-fit,minmax(450px,1fr))] gap-x-5 gap-y-6'>
      <Suspense fallback={<InputSkeletonLoading />}>
        <StatusComboBox
          value={statusId}
          onChange={handleChange}
          isDisabled={disabled.statusId}
          isRequired={required.statusId}
          error={errors.statusId}
          type='form'
        />
      </Suspense>        
      <Suspense fallback={<InputSkeletonLoading />}>
        <CategoryComboBox
          value={categoryId}
          onChange={handleChange}
          isDisabled={disabled.categoryId}
          isRequired={required.categoryId}
          error={errors.categoryId}
          type='form'
          isAdd={isAddForm}
        />
      </Suspense>
      <Suspense fallback={<InputSkeletonLoading />}>
        <BrandComboBox
          value={brandId}
          onChange={handleChange}
          isDisabled={disabled.brandId}
          isRequired={required.brandId}
          error={errors.brandId}
          categoryId={categoryId}
          type='form'
          isAdd={isAddForm}
        />
      </Suspense>
      <Suspense fallback={<InputSkeletonLoading />}>
        <ModelComboBox
          value={modelId}
          handleModel={handleModel}
          categoryId={categoryId}
          brandId={brandId}
          type='form'
          isAdd={isAddForm}
          isDisabled={disabled.modelId}
          isRequired={required.modelId}
          error={errors.modelId}
        />
      </Suspense>
      <Suspense fallback={<InputSkeletonLoading />}>
        <SerialInput
          value={serial}
          onChange={handleChange}
          isDisabled={disabled.serial}
          isRequired={required.serial}
          error={errors.serial}
          type='form'
          isAdd={isAddForm}
        />
      </Suspense>
      <Suspense fallback={<InputSkeletonLoading />}>
        <ActivoInput
          value={activo}
          onChange={handleChange}
          isDisabled={disabled.activo}
          isRequired={required.activo}
          error={errors.activo}
          isForm
        />
      </Suspense>        
      <Suspense fallback={<InputSkeletonLoading />}>
        <EmployeeComboBox
          onChange={handleChange}
          isDisabled={disabled.employeeId}
          isRequired={required.employeeId}
          error={errors.employeeId}
          name='employeeId'
          type='form'
          status={statusId}
          value={employeeId}
        />
      </Suspense>
      <div className='flex gap-5 col-span-2'>
        <Suspense fallback={<InputSkeletonLoading />}>
          <LocationComboBox
            handleLocation={handleLocation}
            value={locationId}
            statusId={statusId}
            isDisabled={disabled.locationId}
            isRequired={required.locationId}
            error={errors.locationId}
            type='form'
          />
        </Suspense>
        <Suspense fallback={<InputSkeletonLoading />}>
          <StockNumberInput
            onChange={handleChange}
            isDisabled={disabled.stockNumber}
            isRequired={required.stockNumber}
            error={errors.stockNumber}
            value={stockNumber}            
          />
        </Suspense>
      </div>        
      <Suspense fallback={<InputSkeletonLoading />}>
        <ObservationInput
          onChange={handleChange}
          isDisabled={disabled.observation}
          isRequired={required.observation}
          error={errors.observation}
          value={observation}
        />
      </Suspense>
    </div>
  )
}
