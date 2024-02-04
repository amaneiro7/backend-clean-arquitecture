import { useState } from 'react'
import { useAppContext } from '../../Context/AppContext'

export const enum FormStatus {
  Loading,
  Success,
  Error,
  Initial
}

export function useBrandForm (): {
  formStatus: FormStatus
  submitForm: (formData: { name: string }) => Promise<void>
  resetFormStatus: () => void
} {
  const [formStatus, setFormStatus] = useState(FormStatus.Initial)
  const { createBrand } = useAppContext()

  async function submitForm ({ name }: { name: string }) {
    setFormStatus(FormStatus.Loading)

    try {
      await createBrand({ name })
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
