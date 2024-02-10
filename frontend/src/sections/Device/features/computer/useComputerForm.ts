import { useState } from 'react'
import { useAppContext } from '../../../Context/AppContext'

export const enum FormStatus {
  Loading,
  Success,
  Error,
  Initial
}

export function useHardDriveForm (): {
  formStatus: FormStatus
  submitForm: (formData: Omit<HardDrivePrimitives, 'id'>) => Promise<void>
  resetFormStatus: () => void
} {
  const [formStatus, setFormStatus] = useState(FormStatus.Initial)
  const { repository } = useAppContext()
  const { createHardDrive } = useCom(repository)

  async function submitForm ({ categoryId, deviceId, hardDriveCapacityId, hardDriveTypeId, health }: Omit<HardDrivePrimitives, 'id'>) {
    setFormStatus(FormStatus.Loading)

    try {
      await createHardDrive({ categoryId, deviceId, hardDriveCapacityId, hardDriveTypeId, health })
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
