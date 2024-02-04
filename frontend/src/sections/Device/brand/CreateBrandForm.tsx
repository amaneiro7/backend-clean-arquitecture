import { type FormEvent, useEffect, useState } from 'react'
import { useGenericFormData } from '../../Hooks/useGenericFormData'
import { FormContainer } from '../../components/formContainer'
import { useBrandForm } from './useBrandForm'
import { BrandName } from '../../../modules/devices/brand/domain/BrandName'
import BrandNameInput from './BrandNameInput'

const initialState = {
  name: ''
}

export default function CreateBrandForm () {
  const { formData, updateForm, resetFrom } = useGenericFormData(initialState)
  const { formStatus, submitForm, resetFormStatus } = useBrandForm()
  const [errors, setErrors] = useState(initialState)

  useEffect(() => {
    const isName = BrandName.isValid(formData.name)

    setErrors({
      name: isName ? '' : BrandName.invalidMessage(formData.name)
    })
  }, [formData])

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    const { name } = formData
    await submitForm({ name })
  }

  const handleClose = () => {
    window.history.back()
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
      <BrandNameInput
          value={formData.name}
          onChange={handleChange}
          errorMessage={errors.name}
      />
    </FormContainer>
  )
}
