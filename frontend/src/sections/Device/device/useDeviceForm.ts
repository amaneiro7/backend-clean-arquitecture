import { useState } from 'react'
import { useAppContext } from '../../Context/AppContext'
import { toastMessage } from '../../utils/toaster'
import { type DevicePrimitives } from '../../../modules/devices/devices/devices/domain/Device'

export const enum FormStatus {
  Loading,
  Success,
  Error,
  Initial
}

export function useDeviceForm (): {
  formStatus: FormStatus
  submitForm: (formData: DevicePrimitives) => Promise<void>
  resetFormStatus: () => void
} {
  const [formStatus, setFormStatus] = useState(FormStatus.Initial)
  const { device: { createDevice } } = useAppContext()

  async function submitForm (formData: DevicePrimitives) {
    setFormStatus(FormStatus.Loading)
    toastMessage({ type: 'loading', message: 'Cargando...' })

    try {
      await createDevice(formData)
      toastMessage({ type: 'success', message: 'Dispositivo Creado' })
      setFormStatus(FormStatus.Success)
    } catch (error: any) {
      toastMessage({ type: 'error', message: error.message })
      console.log(error)

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
