import { lazy } from 'react'
import { useLocation } from 'react-router-dom'
import { useFormDevice } from './useFormDevice'

const FormContainer = lazy(async () => await import('../../components/formContainer/formContainer'))
const DeviceSearchComboBox = lazy(async () => import('../../components/combo_box/DeviceSearchComboBox'))

const DeviceFeatures = lazy(async () => await import('./DeviceFeatures'))
const MainFormInputs = lazy(async () => await import('./MainFormInputs').then(m => ({ default: m.MainFormInputs})))

export default function CreateDeviceForm() {
  const location = useLocation()
  const { handleChange, handleClose, handleSubmit, isAddForm, formData, processing } = useFormDevice()

  return (
    <FormContainer
      key={location.key}
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
        <DeviceFeatures
          formData={formData}
          onChange={handleChange}
        />
      </div>
    </FormContainer>
  )
}
