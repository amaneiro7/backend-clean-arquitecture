import { lazy, useMemo } from 'react'
import { useFormDevice } from './useGenericFormData'
import { Computer } from '../../../modules/devices/fetures/computer/domain/Computer'
import { HardDrive } from '../../../modules/devices/fetures/hardDrive/hardDrive/domain/HardDrive'
import { MFP } from '../../../modules/devices/fetures/multiFunctionalPrinter/MFP'

const FormContainer = lazy(async () => await import('../../components/formContainer/formContainer'))
const DeviceSearchComboBox = lazy(async () => import('../../components/combo_box/DeviceSearchComboBox'))
const MainFormInputs = lazy(async () => await import('./MainFormInputs').then(m => ({ default: m.MainFormInputs})))
const AddComputerFeatures = lazy(async () => await import('./AddComputerFeatures'))
const AddHardDriveFeatures = lazy(async () => await import('./AddHardDriveFeatures'))
const AddMFPFeatures = lazy(async () => await import('./AddMFPFeatures'))

export default function CreateDeviceForm() {
  const { handleChange, handleMemory, handleModel, handleClose, handleSubmit, isAddForm, formData, processing } = useFormDevice()
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
        isAddForm={isAddForm}
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
            statusId={formData.statusId}
            computerName={formData.computerName}
            processorId={formData.processorId}
            memoryRam={formData.memoryRam}
            memoryRamCapacity={formData.memoryRamCapacity}
            memoryRamSlotQuantity={formData.memoryRamSlotQuantity}
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
            statusId={formData.statusId}
            hardDriveCapacityId={formData.hardDriveCapacityId}
            hardDriveTypeId={formData.hardDriveTypeId}
            health={formData.health}
          /> 
        : null}
        {categoryType === 'mfp' ? 
          <AddMFPFeatures
            onChange={handleChange}
            statusId={formData.statusId}
            ipAddress={formData.ipAddress}
          /> 
        : null}
      </div>
    </FormContainer>
  )
}
