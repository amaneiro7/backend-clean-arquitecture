import { useState } from 'react'
import { useAppContext } from '../../Context/AppContext'

export const enum FormStatus {
  Loading,
  Success,
  Error,
  Initial
}

export function useModelForm (): {
  formStatus: FormStatus
  submitForm: (formData: { name: string, categoryId: number, brandId: string }) => Promise<void>
  resetFormStatus: () => void
} {
  const [formStatus, setFormStatus] = useState(FormStatus.Initial)
  const { createModel } = useAppContext()

  async function submitForm ({ name, categoryId, brandId }: { name: string, categoryId: number, brandId: string }) {
    setFormStatus(FormStatus.Loading)

    try {
      await createModel({ name, categoryId, brandId })
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
