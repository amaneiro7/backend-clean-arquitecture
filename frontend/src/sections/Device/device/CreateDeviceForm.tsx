import { type FormEvent, useEffect, useState } from 'react'
import { useDeviceForm } from './useDeviceForm'
import { useDeviceFormData } from './useDeviceFormData'
import { DeviceSerial } from '../../../modules/devices/devices/devices/domain/DeviceSeria'
import { DeviceActivo } from '../../../modules/devices/devices/devices/domain/DeviceActivo'
import { FormContainer } from '../../components/formContainer'
import { useNavigate } from 'react-router-dom'
import ActivoInput from './ActivoInput'
import StatusSelect from '../status/StatusSelect'
import SerialInput from './SerialInput'

const initialState = {
  serial: '',
  activo: '',
  statusId: 1,
  modelId: ''
}

export default function CreateDeviceForm () {
  const navigate = useNavigate()
  const { formData, updateForm, resetFrom } = useDeviceFormData(initialState)
  const { formStatus, submitForm, resetFormStatus } = useDeviceForm()
  const [errors, setErrors] = useState(initialState)

  useEffect(() => {
    const isSerial = DeviceSerial.isValid(formData.serial)
    const isActivo = DeviceActivo.isValid(formData.activo)

    setErrors({
      modelId: '',
      statusId: 0,
      serial: isSerial ? '' : DeviceSerial.invalidMessage(formData.serial),
      activo: isActivo ? '' : DeviceActivo.invalidMessage(formData.activo)
    })
  }, [formData])

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
        isDisabled
    >
    <SerialInput
        value={formData.serial}
        onChange={handleChange}
        errorMessage={errors.serial}
    />
    <ActivoInput
        value={formData.activo}
        onChange={handleChange}
        errorMessage={errors.activo}
    />
    <StatusSelect
        value={formData.statusId}
        onChange={handleChange}
    />
    </FormContainer>
  )
}
