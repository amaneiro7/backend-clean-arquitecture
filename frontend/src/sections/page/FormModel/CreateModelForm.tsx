import { lazy, useEffect } from 'react'
import { type ModelPrimitives } from '../../../modules/devices/model/model/domain/Model'
import { useGenericFormData } from '../../Hooks/useGenericFormData'
import { useModelInitialState } from '../../Hooks/model/ModelFormInitialState'
import { useLocation } from 'react-router-dom'
import { useGenericForm, FormStatus } from '../../Hooks/useGenericForm'
import { useModel } from '../../Hooks/model/useModel'

const FormContainer = lazy(async () => import('../../components/formContainer/formContainer'))
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
  }, [preloadedModelState, resetForm, updateForm])

  useEffect(() => {
    if (formStatus === FormStatus.Success) {
      resetFormStatus()
      resetForm()
      handleClose()
    }
    if (formStatus === FormStatus.Error) {
      resetFormStatus()
    }
  }, [formStatus, resetForm, resetFormStatus])

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
    <FormContainer
      key={location.key}
      title='Modelo'
      description='Ingrese los datos del modelo el cual desea registar, la categoria y la marca la cual va ser relacionada.'
      isAddForm={isAddForm}
      handleSubmit={handleSubmit}
      handleClose={handleClose}
      isDisabled={formStatus === FormStatus.Loading}
      lastUpdated={formData.updatedAt}
      url='/model/add'
    >
      <ModelInputs isAddForm={isAddForm} formData={formData} onChange={handleChange} />        
    </FormContainer>    
  )
}
