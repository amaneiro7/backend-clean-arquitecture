import { type FormEvent, useEffect, lazy, Suspense } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
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

const initialState = {
  serial: '',
  activo: '',
  statusId: 0,
  modelId: '',
  categoryId: 0,
  brandId: '',
  memoryRamCapacity: 0,
  hardDriveCapacityId: 0,
  hardDriveTypeId: 0,
  operatingSystemId: 0,
  operatingSystemArqId: 0,
  ipAddress: '',
  macAddress: '',
  health: 100
}
export default function CreateDeviceForm () {
  const navigate = useNavigate()
  const { preloadedDeviceState } = useDeviceInitialState()
  const { formData, updateForm, resetForm } = useGenericFormData(initialState)
  const { formStatus, submitForm, resetFormStatus } = useDeviceForm()

  useEffect(() => {
    updateForm(preloadedDeviceState)
    return () => {
      resetForm()
    }
  }, [preloadedDeviceState])

  useEffect(() => {
    if (formStatus === FormStatus.Loading) {
      toast.loading('Cargando...')
    }
    if (formStatus === FormStatus.Success) {
      toast.success('Dispositivo creado exitosamente')
      resetFormStatus()
      resetForm()
    }
    if (formStatus === FormStatus.Error) {
      toast.error('Error al crear dispositivo')
      resetFormStatus()
    }
  }, [formStatus])

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
