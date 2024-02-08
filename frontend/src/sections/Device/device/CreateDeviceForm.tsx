import { type FormEvent, useEffect, useState, useRef, lazy, Suspense } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDeviceForm } from './useDeviceForm'
import { useDeviceInitialState } from './DeviceFormInitialState'
import { useGenericFormData } from '../../Hooks/useGenericFormData'
import { DeviceSerial } from '../../../modules/devices/devices/devices/domain/DeviceSeria'
import { DeviceActivo } from '../../../modules/devices/devices/devices/domain/DeviceActivo'
import { FormContainer } from '../../components/formContainer'

const CategorySelect = lazy(async () => await import('../category/CategorySelect'))
const BrandSelect = lazy(async () => await import('../brand/BrandSelect'))
const SerialInput = lazy(async () => await import('../device/SerialInput'))
const ActivoInput = lazy(async () => await import('../device/ActivoInput'))
const StatusSelect = lazy(async () => await import('../status/StatusSelect'))
const ModelSelect = lazy(async () => await import('../model/ModelSelect'))

const initialState = {
  serial: '',
  activo: '',
  statusId: 1,
  modelId: '',
  categoryId: 1,
  brandId: ''
}
export default function CreateDeviceForm () {
  const navigate = useNavigate()
  const { preloadedDeviceState } = useDeviceInitialState()
  const { formData, updateForm, resetForm } = useGenericFormData(initialState)
  const { formStatus, submitForm, resetFormStatus } = useDeviceForm()
  const [errors, setErrors] = useState(initialState)
  const isFirtsInputSerial = useRef(true)
  const isFirtsInputActivo = useRef(true)

  useEffect(() => {
    updateForm(preloadedDeviceState)
    return () => {
      resetForm()
    }
  }, [preloadedDeviceState])

  useEffect(() => {
    if (isFirtsInputSerial.current) {
      isFirtsInputSerial.current = formData.serial === ''
      return
    }
    if (isFirtsInputActivo.current) {
      isFirtsInputActivo.current = formData.activo === ''
      return
    }
    const isSerial = DeviceSerial.isValid(formData.serial)
    const isActivo = DeviceActivo.isValid(formData.activo)

    setErrors({
      ...errors,
      serial: isSerial ? '' : DeviceSerial.invalidMessage(formData.serial),
      activo: isActivo ? '' : DeviceActivo.invalidMessage(formData.activo)
    })

    return () => {
      setErrors(initialState)
    }
  }, [formData])

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    const { serial, activo, statusId, modelId } = formData
    await submitForm({ serial, activo, statusId, modelId })
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
        isDisabled
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
        />
      </Suspense>
      <Suspense>
        <SerialInput
            value={formData.serial}
            onChange={handleChange}
          errorMessage={errors.serial}
        />
      </Suspense>
      <Suspense>
        <ActivoInput
            value={formData.activo}
            onChange={handleChange}
          errorMessage={errors.activo}
          />
      </Suspense>
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
        />
      </Suspense>
    </FormContainer>
  )
}
