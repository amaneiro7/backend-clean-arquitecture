import { useState } from 'react'
import { useAppContext } from '../../../Context/AppContext'
import { useProcessor } from './useProcessor'
import { toastMessage } from '../../../utils/toaster'

export const enum FormStatus {
  Loading,
  Success,
  Error,
  Initial
}

export function useProcessorForm (): {
  formStatus: FormStatus
  submitForm: (formData: { id?: string, name: string }) => Promise<void>
  resetFormStatus: () => void
} {
  const [formStatus, setFormStatus] = useState(FormStatus.Initial)
  const { repository } = useAppContext()
  const { createProcessor } = useProcessor(repository)

  async function submitForm ({ name }: { name: string }) {
    setFormStatus(FormStatus.Loading)
    toastMessage({ type: 'loading', message: 'Cargando...' })

    try {
      await createProcessor({ name })
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
