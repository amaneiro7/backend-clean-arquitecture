import { lazy, useMemo } from 'react'
import { useFormDevice } from './useGenericFormData'
import { Computer } from '@/modules/devices/fetures/computer/domain/Computer'
import { HardDrive } from '@/modules/devices/fetures/hardDrive/hardDrive/domain/HardDrive'
import { MFP } from '@/modules/devices/fetures/multiFunctionalPrinter/MFP'

const FormContainer = lazy(async () => await import('@/sections/components/formContainer/formContainer'))
const DeviceSearchComboBox = lazy(async () => import('@/sections/components/combo_box/DeviceSearchComboBox'))
const MainFormInputs = lazy(async () => await import('./MainFormInputs').then(m => ({ default: m.MainFormInputs})))
const AddComputerFeatures = lazy(async () => await import('./AddComputerFeatures'))
const AddHardDriveFeatures = lazy(async () => await import('./AddHardDriveFeatures'))
const AddMFPFeatures = lazy(async () => await import('./AddMFPFeatures'))

export default function CreateDeviceForm() {
  const { handleChange, handleMemory, handleModel, handleLocation, handleClose, handleSubmit, isAddForm, formData, processing, disabled, error, required } = useFormDevice()
  const categoryType = useMemo(() => {
    return Computer.isComputerCategory({ categoryId: formData.categoryId }) ? 'computer' :
    HardDrive.isHardDriveCategory({ categoryId: formData.categoryId }) ? 'hardDrive' :
    MFP.isMFPCategory({ categoryId: formData.categoryId }) ? 'mfp' : null
  }, [formData.categoryId])

  
  return (
    <FormContainer      
      title='Dispositivo'
      description='Ingrese los datos del dispositivo.'
      isAddForm={isAddForm}
      handleSubmit={handleSubmit}
      handleClose={handleClose}
      isDisabled={processing}
      lastUpdated={formData.updatedAt}
      updatedBy={formData.history}
      url='/device/add'
      searchInput={<DeviceSearchComboBox />}
    >
      <MainFormInputs 
        handleChange={handleChange}
        handleModel={handleModel}
        handleLocation={handleLocation}
        isAddForm={isAddForm}
        disabled={disabled}
        errors={error}
        required={required}
        statusId={formData.statusId}
        categoryId={formData.categoryId}
        brandId={formData.brandId}
        modelId={formData.modelId}
        serial={formData.serial}
        activo={formData.activo}
        employeeId={formData.employeeId}
        locationId={formData.locationId}
        stockNumber={formData.stockNumber}
        observation={formData.observation}
      />
      <div className='grid grid-cols-[repeat(auto-fit,minmax(450px,1fr))] gap-4'>
        {(categoryType === 'computer' && formData.modelId) ? 
          <AddComputerFeatures
            handleMemory={handleMemory} 
            onChange={handleChange}
            disabled={disabled}
            errors={error}
            required={required}            
            computerName={formData.computerName}
            processorId={formData.processorId}
            memoryRam={formData.memoryRam}
            memoryRamCapacity={formData.memoryRamCapacity}
            memoryRamType={formData.memoryRamType}
            hardDriveCapacityId={formData.hardDriveCapacityId}
            hardDriveTypeId={formData.hardDriveTypeId}
            operatingSystemArqId={formData.operatingSystemArqId}
            operatingSystemId={formData.operatingSystemId}
            ipAddress={formData.ipAddress}
            macAddress={formData.macAddress}
          /> 
        : null}
        {categoryType === 'hardDrive' ? 
          <AddHardDriveFeatures
            onChange={handleChange}
            hardDriveCapacityId={formData.hardDriveCapacityId}
            hardDriveTypeId={formData.hardDriveTypeId}
            health={formData.health}
            disabled={disabled}
            errors={error}
            required={required}            
          /> 
        : null}
        {categoryType === 'mfp' ? 
          <AddMFPFeatures
            onChange={handleChange}
            ipAddress={formData.ipAddress}
            disabled={disabled}
            errors={error}
            required={required}            
          /> 
        : null}
      </div>
    </FormContainer>
  )
}
