import { lazy, Suspense } from 'react'
import { InputSkeletonLoading } from '../../components/skeleton/inputSkeletonLoading'
import { type Primitives } from '../../../modules/shared/domain/value-object/Primitives'
import { type StatusId } from '../../../modules/devices/devices/status/domain/StatusId'
import { type CategoryId } from '../../../modules/devices/category/domain/CategoryId'
import { type BrandId } from '../../../modules/devices/brand/domain/BrandId'
import { type ModelId } from '../../../modules/devices/model/model/domain/ModelId'
import { type DeviceSerial } from '../../../modules/devices/devices/devices/domain/DeviceSerial'
import { type DeviceActivo } from '../../../modules/devices/devices/devices/domain/DeviceActivo'
import { type DeviceEmployee } from '../../../modules/devices/devices/devices/domain/DeviceEmployee'
import { type DeviceLocation } from '../../../modules/devices/devices/devices/domain/DeviceLocation'
import { type DeviceStockNumber } from '../../../modules/devices/devices/devices/domain/DeviceStockNumber'
import { type DeviceObservation } from '../../../modules/devices/devices/devices/domain/DeviceObservation'

const StatusComboBox = lazy(async () => await import('../../components/combo_box/StatusComboBox'))
const CategoryComboBox = lazy(async () => await import('../../components/combo_box/CategoryComboBox'))
const BrandComboBox = lazy(async () => await import('../../components/combo_box/BrandComboBox'))
const ModelComboBox = lazy(async () => await import('../../components/combo_box/ModelComboBox'))
const SerialInput = lazy(async () => await import('../../components/text-inputs/SerialInput'))
const ActivoInput = lazy(async () => await import('../../components/text-inputs/ActivoInput'))
const EmployeeComboBox = lazy(async () => await import('../../components/combo_box/EmployeeComboBox'))
const LocationComboBox = lazy(async () => await import('../../components/combo_box/LocationComboBox'))
const ObservationInput = lazy(async () => await import('../../components/text-inputs/ObservationInput'))
const StockNumberInput = lazy(async () => import('../../components/text-inputs/StockNumberInput').then(m => ({ default: m.StockNumberInput})))

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
    handleChange,
    handleModel
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
    handleChange: (name: string, value: string) => void
    handleModel: ({ value, memoryRamSlotQuantity, memoryRamType }: { value: string; memoryRamSlotQuantity?: number; memoryRamType?: string }) => void
    isAddForm: boolean
}) {
  return (
    <div className='grid grid-cols-[repeat(auto-fit,minmax(450px,1fr))] gap-4'>
      <Suspense fallback={<InputSkeletonLoading />}>
        <StatusComboBox
          value={statusId}
          onChange={handleChange}
          type='form'
        />
      </Suspense>        
      <Suspense fallback={<InputSkeletonLoading />}>
        <CategoryComboBox
          value={categoryId}
          onChange={handleChange}
          type='form'
          isAdd={isAddForm}
        />
      </Suspense>
      <Suspense fallback={<InputSkeletonLoading />}>
        <BrandComboBox
          value={brandId}
          onChange={handleChange}
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
        />
      </Suspense>
      <Suspense fallback={<InputSkeletonLoading />}>
        <SerialInput
          value={serial}
          onChange={handleChange}
          type='form'
          isAdd={isAddForm}
        />
      </Suspense>
      <Suspense fallback={<InputSkeletonLoading />}>
        <ActivoInput
          value={activo}
          onChange={handleChange}
          isForm
        />
      </Suspense>        
      <Suspense fallback={<InputSkeletonLoading />}>
        <EmployeeComboBox
          onChange={handleChange}
          name='employeeId'
          type='form'
          status={statusId}
          value={employeeId}
        />
      </Suspense>
      <div className='flex gap-5 col-span-2'>
        <Suspense fallback={<InputSkeletonLoading />}>
          <LocationComboBox
            onChange={handleChange}
            value={locationId}
            statusId={statusId}
            type='form'
          />
        </Suspense>
        <Suspense fallback={<InputSkeletonLoading />}>
          <StockNumberInput
            onChange={handleChange}
            value={stockNumber}
            status={statusId}
            type='form'
          />
        </Suspense>
      </div>        
      <Suspense fallback={<InputSkeletonLoading />}>
        <ObservationInput
          onChange={handleChange}
          value={observation}
        />
      </Suspense>
    </div>
  )
}
