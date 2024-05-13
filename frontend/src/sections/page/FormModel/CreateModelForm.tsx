import { lazy, Suspense, useEffect } from 'react'
import { FormStatus, useModelForm } from '../../Hooks/model/useModelForm'
import { useGenericFormData } from '../../Hooks/useGenericFormData'
import { useModelInitialState } from './ModelFormInitialState'
import { useLocation } from 'react-router-dom'

const Main = lazy(async () => import('../../components/Main'))
const ModelNameInput = lazy(async () => import('../../components/text-inputs/ModelNameInput'))
const CategoryComboBox = lazy(async () => import('../../components/combo_box/CategoryComboBox'))
const BrandComboBox = lazy(async () => import('../../components/combo_box/BrandComboBox'))
const FormContainer = lazy(async () => import('../../components/formContainer'))
const ModelFeatures = lazy(async () => import('./ModelFeatures').then(m => ({default: m.ModelFeatures})))

export default function CreateModelForm() {
  const location = useLocation()
  const { preloadedModelState, isAddForm } = useModelInitialState()
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

  const handleSubmit = async (event: React.FormEvent) => {
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
    <Main>
      <Suspense>
        <FormContainer
          key={location.key}
          title='Modelo'
          handleSubmit={handleSubmit}
          handleClose={handleClose}
          isDisabled={formStatus === FormStatus.Loading}
        >
          <CategoryComboBox
            value={formData.categoryId}
            onChange={handleChange}
            type='form'
            isAdd={isAddForm}
          />
          <BrandComboBox
            value={formData.brandId}
            onChange={handleChange}
            categoryId={formData.categoryId}
            type='form'
            isAdd={isAddForm}
          />
          <ModelNameInput
            value={formData.name}
            onChange={handleChange}
          />
          <Suspense>
            <ModelFeatures formData={formData} onChange={handleChange} />
          </Suspense>
        </FormContainer>
      </Suspense>
    </Main>
  )
}
