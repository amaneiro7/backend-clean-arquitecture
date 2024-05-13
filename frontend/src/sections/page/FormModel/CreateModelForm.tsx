import { lazy, Suspense, useEffect } from 'react'
import { FormStatus, useModelForm } from '../../Hooks/model/useModelForm'
import { useGenericFormData } from '../../Hooks/useGenericFormData'
import { useModelInitialState } from './ModelFormInitialState'
import { useLocation } from 'react-router-dom'

const Main = lazy(async () => import('../../components/Main'))
const FormContainer = lazy(async () => import('../../components/formContainer'))
const ModelInputs = lazy(async () => import('./ModelFeatures').then(m => ({default: m.ModelInputs})))

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
    event.stopPropagation()
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
          lastUpdated={formData.updatedAt}
          url='/model/add'
        >          
          <Suspense>
            <ModelInputs isAddForm={isAddForm} formData={formData} onChange={handleChange} />
          </Suspense>
        </FormContainer>
      </Suspense>
    </Main>
  )
}
