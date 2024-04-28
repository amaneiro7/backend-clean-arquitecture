import { useState } from 'react'
import { useAppContext } from '../../../Context/AppContext'
import { useProcessor } from './useProcessor'
import { toastMessage } from '../../../utils/toaster'
import { ProcessorPrimitives } from '../../../../modules/devices/fetures/processor/domain/Processor'

export const enum FormStatus {
  Loading,
  Success,
  Error,
  Initial
}

export function useProcessorForm (): {
  formStatus: FormStatus
  submitForm: (formData: ProcessorPrimitives) => Promise<void>
  resetFormStatus: () => void
} {
  const [formStatus, setFormStatus] = useState(FormStatus.Initial)
  const { repository } = useAppContext()
  const { createProcessor } = useProcessor(repository)

  async function submitForm (formData: ProcessorPrimitives) {
    setFormStatus(FormStatus.Loading)
    toastMessage({ type: 'loading', message: 'Cargando...' })

    try {
      await createProcessor(formData)
      setFormStatus(FormStatus.Success)
      toastMessage({ type: 'success', message: 'Procesador Creadao' })
    } catch (error: any) {
      toastMessage({ type: 'error', message: error.message })
      console.error('useProcessorForm', error)
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
