import { useState } from 'react'
import { useAppContext } from '../../Context/AppContext'
import { useDevice } from './useDevice'
import { type DeviceProps } from '../../../modules/devices/devices/devices/application/DeviceCreator'

export const enum FormStatus {
  Loading,
  Success,
  Error,
  Initial
}

export function useDeviceForm (): {
  formStatus: FormStatus
  submitForm: (formData: DeviceProps) => Promise<void>
  resetFormStatus: () => void
} {
  const [formStatus, setFormStatus] = useState(FormStatus.Initial)
  const { repository } = useAppContext()
  const { createDevice } = useDevice(repository)

  async function submitForm (formData: DeviceProps) {
    setFormStatus(FormStatus.Loading)

    try {
      await createDevice(formData)
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
