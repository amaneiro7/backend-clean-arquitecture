import { type FormEvent, lazy, Suspense, useEffect } from 'react'
import { useGenericFormData } from '../../Hooks/useGenericFormData'

import { FormStatus, useModelForm } from '../../Hooks/model/useModelForm'
import ModelNameInput from '../../components/text-inputs/ModelNameInput'
import { useModelInitialState } from './ModelFormInitialState'

const CategoryComboBox = lazy(async () => await import('../../components/combo_box/CategoryComboBox'))
const BrandComboBox = lazy(async () => await import('../../components/combo_box/BrandComboBox'))

const FormContainer = lazy(async () => import('../../components/formContainer'))
export default function CreateModelForm() {
  const { preloadedModelState } = useModelInitialState()
  const { formData, updateForm, resetForm } = useGenericFormData(preloadedModelState)
  const { formStatus, submitForm, resetFormStatus } = useModelForm()

  useEffect(() => {
    updateForm(preloadedModelState)

    return () => {
      resetForm()
    }
  }, [preloadedModelState])

  useEffect(() => {
    if (formStatus === FormStatus.Success) {
      resetFormStatus()
      resetForm()
      handleClose()
    }
    if (formStatus === FormStatus.Error) {
      resetFormStatus()
    }
  }, [formStatus])

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    await submitForm(formData)
  }

  const handleClose = () => {
    window.history.back()
  }

  const handleChange = (name: string, value: string) => {
    updateForm({ [name]: value })
  }

  return (
    <Suspense>
      <FormContainer
        title='Modelo'
        handleSubmit={handleSubmit}
        handleClose={handleClose}
        isDisabled={formStatus === FormStatus.Loading}
      >
        <CategoryComboBox
          value={formData.categoryId}
          onChange={handleChange}
          type='form'
        />
        <BrandComboBox
          value={formData.brandId}
          onChange={handleChange}
          categoryId={formData.categoryId}
          type='form'
        />
        <ModelNameInput
          value={formData.name}
          onChange={handleChange}
        />
      </FormContainer>
    </Suspense>
  )
}
