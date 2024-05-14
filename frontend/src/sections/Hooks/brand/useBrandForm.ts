import { useState } from 'react'
import { useBrand } from './useBrand'
import { toastMessage } from '../../utils/toaster'

export const enum FormStatus {
  Loading,
  Success,
  Error,
  Initial
}

export function useBrandForm (): {
  formStatus: FormStatus
  submitForm: (formData: { id?: string, name: string }) => Promise<void>
  resetFormStatus: () => void
} {
  const [formStatus, setFormStatus] = useState(FormStatus.Initial)  
  const { createBrand } = useBrand()

  async function submitForm ({ id, name }: { id?: string, name: string }) {
    setFormStatus(FormStatus.Loading)
    toastMessage({ type: 'loading', message: 'Cargando...' })

    try {
      await createBrand({ id, name })
      setFormStatus(FormStatus.Success)
      toastMessage({ type: 'success', message: 'Marca Creada exitosamente' })
    } catch (error) {
      setFormStatus(FormStatus.Error)
      toastMessage({ type: 'error', message: 'Ha ocurrido un error' })
    }
  }

  function resetFormStatus () {
    setFormStatus(FormStatus.Initial)
  }

  return {
    formStatus,
    submitForm,
    resetFormStatus
  }
}
