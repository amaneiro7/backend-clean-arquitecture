import { lazy, Suspense, useEffect } from 'react'
import { type BrandPrimitives } from '../../../modules/devices/brand/domain/Brand'
import { useGenericFormData } from '../../Hooks/useGenericFormData'
import { useBrandInitialState } from '../../Hooks/brand/BrandFormInitialState'
import { useGenericForm, FormStatus } from '../../Hooks/useGenericForm'
import { useBrand } from '../../Hooks/brand/useBrand'
import { useLocation } from 'react-router-dom'

const BrandNameInput = lazy(async () => import('../../components/text-inputs/BrandNameInput'))
const FormContainer = lazy(async () => import('../../components/formContainer/formContainer'))

export default function CreateBrandForm() {
  const location = useLocation()
  const { createBrand } = useBrand()
  const { preloadedBrandState } = useBrandInitialState()
  const { formData, updateForm, resetForm } = useGenericFormData(preloadedBrandState)
  const { formStatus, submitForm, resetFormStatus } = useGenericForm<BrandPrimitives>({create: createBrand})

  useEffect(() => {
    updateForm(preloadedBrandState)

    return () => {
      resetForm()
    }
  }, [preloadedBrandState])

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
    <Suspense>
      <FormContainer
        key={location.key}
        title='marca'
        description='Ingrese los datos de la marca el cual desea registar.'
        isAddForm
        handleSubmit={handleSubmit}
        handleClose={handleClose}
        isDisabled={formStatus === FormStatus.Loading}
      >
        <BrandNameInput
          value={formData.name}
          onChange={handleChange}
        />
      </FormContainer>
    </Suspense>
  )
}
