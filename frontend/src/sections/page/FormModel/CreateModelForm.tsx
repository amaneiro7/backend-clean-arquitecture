import { lazy, Suspense, useEffect } from 'react'
import { useGenericFormData } from '../../Hooks/useGenericFormData'
import { useModelInitialState } from '../../Hooks/model/ModelFormInitialState'
import { useLocation } from 'react-router-dom'
import { useGenericForm, FormStatus } from '../../Hooks/useGenericForm'
import { useModel } from '../../Hooks/model/useModel'
import { ModelPrimitives } from '../../../modules/devices/model/model/domain/Model'

const Main = lazy(async () => import('../../components/Main'))
const FormContainer = lazy(async () => import('../../components/formContainer'))
const ModelInputs = lazy(async () => import('./ModelFeatures').then(m => ({ default: m.ModelInputs })))

export default function CreateModelForm() {
  const { createModel } = useModel()
  const location = useLocation()
  const { preloadedModelState, isAddForm } = useModelInitialState()
  const { formData, updateForm, resetForm } = useGenericFormData(preloadedModelState)
  const { formStatus, submitForm, resetFormStatus } = useGenericForm<ModelPrimitives>({create: createModel })

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
    <Main content='max' overflow={false}>
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
