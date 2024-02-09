import { useState } from 'react'
import { useAppContext } from '../../../Context/AppContext'
import { useProcessor } from './useHardDrive'

export const enum FormStatus {
  Loading,
  Success,
  Error,
  Initial
}

export function useProcessorForm (): {
  formStatus: FormStatus
  submitForm: (formData: { name: string }) => Promise<void>
  resetFormStatus: () => void
} {
  const [formStatus, setFormStatus] = useState(FormStatus.Initial)
  const { repository } = useAppContext()
  const { createProcessor } = useProcessor(repository)

  async function submitForm ({ name }: { name: string }) {
    setFormStatus(FormStatus.Loading)

    try {
      await createProcessor({ name })
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
