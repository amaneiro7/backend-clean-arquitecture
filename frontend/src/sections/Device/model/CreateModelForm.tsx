import { type FormEvent, lazy, Suspense, useEffect } from 'react'
import { useGenericFormData } from '../../Hooks/useGenericFormData'

import { FormStatus, useModelForm } from './useModelForm'
import BrandSelect from '../../components/Select/BrandSelect'
import CategorySelect from '../../components/Select/CategorySelect'
import ModelNameInput from '../../components/text-inputs/ModelNameInput'
import { useModelInitialState } from './ModelFormInitialState'

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
        title='Agrega un nuevo Modelo'
        handleSubmit={handleSubmit}
        handleClose={handleClose}
        isDisabled={formStatus === FormStatus.Loading}
      >
        <CategorySelect
          value={formData.categoryId}
          onChange={handleChange}
          isRequired={true}
        />
        <BrandSelect
          value={formData.brandId}
          categoryId={formData.categoryId}
          isRequired={true}
          onChange={handleChange}
        />
        <ModelNameInput
          value={formData.name}
          onChange={handleChange}
        />
      </FormContainer>
    </Suspense>
  )
}
