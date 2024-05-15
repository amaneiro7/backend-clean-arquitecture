import { type FormEvent, lazy, Suspense, useEffect } from 'react'
import { useGenericFormData } from '../../Hooks/useGenericFormData'
import BrandNameInput from '../../components/text-inputs/BrandNameInput'
import { useBrandInitialState } from '../../Hooks/brand/BrandFormInitialState'
import { useGenericForm, FormStatus } from '../../Hooks/useGenericForm'
import { useBrand } from '../../Hooks/brand/useBrand'
import { BrandPrimitives } from '../../../modules/devices/brand/domain/Brand'

const FormContainer = lazy(async () => import('../../components/formContainer'))

export default function CreateBrandForm() {
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
        title='Agrega una nueva Marca'
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
