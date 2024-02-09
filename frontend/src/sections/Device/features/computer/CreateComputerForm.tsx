import { type FormEvent, useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { FormContainer } from '../../../components/formContainer'
const initialState = {

}
export default function CreateComputerForm () {
  const navigate = useNavigate()
  //   const { preloadedDeviceState } = useDeviceInitialState()
  //   const { formData, updateForm, resetForm } = useGenericFormData(initialState)
  //   const { formStatus, submitForm, resetFormStatus } = useDeviceForm()
  //   const [errors, setErrors] = useState(initialState)
  //   const isFirtsInputSerial = useRef(true)
  //   const isFirtsInputActivo = useRef(true)

  //   useEffect(() => {
  //     updateForm(preloadedDeviceState)
  //     return () => {
  //       resetForm()
  //     }
  //   }, [preloadedDeviceState])

  //   useEffect(() => {
  //     if (isFirtsInputSerial.current) {
  //       isFirtsInputSerial.current = formData.serial === ''
  //       return
  //     }
  //     if (isFirtsInputActivo.current) {
  //       isFirtsInputActivo.current = formData.activo === ''
  //       return
  //     }
  //     const isSerial = DeviceSerial.isValid(formData.serial)
  //     const isActivo = DeviceActivo.isValid(formData.activo)

  //     setErrors({
  //       ...errors,
  //       serial: isSerial ? '' : DeviceSerial.invalidMessage(formData.serial),
  //       activo: isActivo ? '' : DeviceActivo.invalidMessage(formData.activo)
  //     })

  //     return () => {
  //       setErrors(initialState)
  //     }
  //   }, [formData])

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    // const { serial, activo, statusId, modelId } = formData
    // await submitForm({ serial, activo, statusId, modelId })
  }

  const handleClose = () => {
    navigate('/')
  }

  const handleChange = (ev: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    // updateForm({ [ev.target.name]: ev.target.value })
  }

  return (
    <FormContainer
        title='Agrega un nuevo Dispositivo'
        handleSubmit={handleSubmit}
        handleClose={handleClose}
        isDisabled
    >
      <CategorySelect
        value={formData.categoryId}
        onChange={handleChange}
      />
      <BrandSelect
        value={formData.brandId}
        onChange={handleChange}
      />
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
      <ModelSelect
        value={formData.modelId}
        onChange={handleChange}
      />
    </FormContainer>
  )
}