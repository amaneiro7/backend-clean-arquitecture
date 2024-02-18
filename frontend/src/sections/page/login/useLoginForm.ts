import { useState } from 'react'
import { toastMessage } from '../../utils/toaster'
import { useAppContext } from '../../Context/AppContext'

export const enum FormStatus {
  Loading,
  Success,
  Error,
  Initial
}

export function useLoginForm (): {
  formStatus: FormStatus
  submitForm: (formData: { email: string, password: string }) => Promise<void>
  resetFormStatus: () => void
} {
  const [formStatus, setFormStatus] = useState(FormStatus.Initial)
  const { useAuth } = useAppContext()

  async function submitForm ({ email, password }: { email: string, password: string }) {
    setFormStatus(FormStatus.Loading)
    toastMessage({ type: 'loading', message: 'Cargando...' })

    try {
      await useAuth.getLogin({ email, password })
      setFormStatus(FormStatus.Success)
      toastMessage({ type: 'success', message: 'Usuario Logeado exitosamente' })
    } catch (error: any) {
      setFormStatus(FormStatus.Error)
      toastMessage({ type: 'error', message: error.message })
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
