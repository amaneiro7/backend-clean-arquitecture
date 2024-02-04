import { type FormEvent, useEffect, useState } from 'react'
import { useGenericFormData } from '../../Hooks/useGenericFormData'
import { FormContainer } from '../../components/formContainer'
import { useModelForm } from './useModelForm'
import { ModelName } from '../../../modules/devices/model/domain/ModelName'
import BrandSelect from '../brand/BrandSelect'
import CategorySelect from '../category/CategorySelect'
import ModelNameInput from './ModelNameInput'

const initialState = {
  name: '',
  categoryId: 1,
  brandId: ''
}

export default function CreateModelForm () {
  const { formData, updateForm, resetFrom } = useGenericFormData(initialState)
  const { formStatus, submitForm, resetFormStatus } = useModelForm()
  const [errors, setErrors] = useState(initialState)

  useEffect(() => {
    const isName = ModelName.isValid(formData.name)

    setErrors({
      ...errors,
      name: isName ? '' : ModelName.invalidMessage(formData.name)
    })
  }, [formData])

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    const { name, categoryId, brandId } = formData
    await submitForm({ name, categoryId, brandId })
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
        <CategorySelect
        value={formData.categoryId}
        onChange={handleChange}
      />
      <BrandSelect
        value={formData.brandId}
        onChange={handleChange}
      />
      <ModelNameInput
          value={formData.name}
          onChange={handleChange}
          errorMessage={errors.name}
      />
    </FormContainer>
  )
}
