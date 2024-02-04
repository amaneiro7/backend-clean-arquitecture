import { useState } from 'react'
import { useAppContext } from '../../Context/AppContext'

export const enum FormStatus {
  Loading,
  Success,
  Error,
  Initial
}

export function useDeviceForm (): {
  formStatus: FormStatus
  submitForm: (formData: { serial: string, activo: string | null, statusId: number, modelId: string }) => Promise<void>
  resetFormStatus: () => void
} {
  const [formStatus, setFormStatus] = useState(FormStatus.Initial)
  const { createDevice } = useAppContext()

  async function submitForm ({ activo, serial, statusId, modelId }: { serial: string, activo: string | null, statusId: number, modelId: string }) {
    setFormStatus(FormStatus.Loading)

    try {
      await createDevice({ serial, activo, statusId, modelId })
      setFormStatus(FormStatus.Success)
    } catch (error) {
      setFormStatus(FormStatus.Error)
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
