import { type FormEvent, useEffect, lazy, Suspense } from 'react'
import { useNavigate } from 'react-router-dom'
import { type CreateDeviceProps } from '../../../modules/devices/devices/devices/application/DeviceCreator'
import { useDeviceForm, FormStatus } from './useDeviceForm'
import { useDeviceInitialState } from './DeviceFormInitialState'
import { useGenericFormData } from '../../Hooks/useGenericFormData'
import { FormContainer } from '../../components/formContainer'

const CategorySelect = lazy(async () => await import('../category/CategorySelect'))
const BrandSelect = lazy(async () => await import('../brand/BrandSelect'))
const SerialInput = lazy(async () => await import('../device/SerialInput'))
const ActivoInput = lazy(async () => await import('../device/ActivoInput'))
const StatusSelect = lazy(async () => await import('../status/StatusSelect'))
const ModelSelect = lazy(async () => await import('../model/ModelSelect'))
const DeviceFeatures = lazy(async () => await import('./DeviceFeatures'))

const initialState: CreateDeviceProps = {
  serial: '',
  activo: '',
  statusId: 1,
  modelId: '',
  categoryId: 1,
  brandId: '',
  memoryRamCapacity: 0,
  hardDriveCapacityId: 1,
  hardDriveTypeId: 1,
  operatingSystemId: 1,
  operatingSystemArqId: 1,
  ipAddress: '',
  macAddress: '',
  health: 100
}
export default function CreateDeviceForm () {
  const navigate = useNavigate()
  const { preloadedDeviceState } = useDeviceInitialState()
  const { formData, updateForm, resetForm } = useGenericFormData(initialState)
  const { formStatus, submitForm, resetFormStatus } = useDeviceForm()
  // const [errors, setErrors] = useState(initialState)

  useEffect(() => {
    updateForm(preloadedDeviceState)
    return () => {
      resetForm()
    }
  }, [preloadedDeviceState])

  // useEffect(() => {
  //   if (isFirtsInputSerial.current) {
  //     isFirtsInputSerial.current = formData.serial === ''
  //     return
  //   }
  //   if (isFirtsInputActivo.current) {
  //     isFirtsInputActivo.current = formData.activo === ''
  //     return
  //   }
  //   const isSerial = DeviceSerial.isValid(formData.serial)
  //   const isActivo = DeviceActivo.isValid(formData.activo)

  //   setErrors({
  //     ...errors,
  //     serial: isSerial ? '' : DeviceSerial.invalidMessage(formData.serial),
  //     activo: isActivo ? '' : DeviceActivo.invalidMessage(formData.activo)
  //   })

  //   return () => {
  //     setErrors(initialState)
  //   }
  // }, [formData])

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    await submitForm(formData)
  }

  const handleClose = () => {
    navigate('/')
  }

  const handleChange = (ev: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    updateForm({ [ev.target.name]: ev.target.value })
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
        />
      </Suspense>
      <Suspense>
        <BrandSelect
          value={formData.brandId}
          onChange={handleChange}
          categoryId={formData.categoryId}
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
          />
        </Suspense>
      <Suspense>
        <ModelSelect
          value={formData.modelId}
          onChange={handleChange}
          categoryId={formData.categoryId}
          brandId={formData.brandId}
        />
      </Suspense>
      <Suspense>
        <DeviceFeatures
          formData={formData}
          onChange={handleChange}
        />
      </Suspense>
    </FormContainer>
  )
}
