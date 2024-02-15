import { useState } from 'react'
import { useAppContext } from '../../Context/AppContext'
import { useLogin } from '../../Auth/useLogin'
import { toastMessage } from '../../utils/toaster'

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
  const { repository } = useAppContext()
  const { getLogin } = useLogin(repository)

  async function submitForm ({ email, password }: { email: string, password: string }) {
    setFormStatus(FormStatus.Loading)
    toastMessage({ type: 'loading', message: 'Cargando...' })

    try {
      await getLogin({ email, password })
      setFormStatus(FormStatus.Success)
      toastMessage({ type: 'success', message: 'Usuario Logeado exitosamente' })
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
