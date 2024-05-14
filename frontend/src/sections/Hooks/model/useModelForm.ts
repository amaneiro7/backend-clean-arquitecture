import { useState } from 'react'
import { useModel } from './useMode'
import { toastMessage } from '../../utils/toaster'
import { type ModelPrimitives } from '../../../modules/devices/model/model/domain/Model'

export const enum FormStatus {
  Loading,
  Success,
  Error,
  Initial
}

export function useModelForm (): {
  formStatus: FormStatus
  submitForm: (formData: ModelPrimitives) => Promise<void>
  resetFormStatus: () => void
} {
  const [formStatus, setFormStatus] = useState(FormStatus.Initial)
  const { createModel } = useModel()

  async function submitForm (formData: ModelPrimitives) {
    setFormStatus(FormStatus.Loading)
    toastMessage({ type: 'loading', message: '...Cargando' })

    try {
      await createModel(formData)
      setFormStatus(FormStatus.Success)
      toastMessage({ type: 'success', message: 'Marca creada exitosamente' })
    } catch (error) {
      setFormStatus(FormStatus.Error)
      console.error('UseModeFrom', error)

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
