import { useState } from 'react'
import { type EmployeePrimitives } from '../../../modules/employee/employee/domain/Employee'
import { toastMessage } from '../../utils/toaster'

export const enum FormStatus {
  Loading,
  Success,
  Error,
  Initial
}

interface Props {
  createEmployee: (formData: EmployeePrimitives) => Promise<void>
}

export function useEmployeeForm ({createEmployee}: Props): {
  formStatus: FormStatus
  submitForm: (formData: EmployeePrimitives) => Promise<void>
  resetFormStatus: () => void
} {
  const [formStatus, setFormStatus] = useState(FormStatus.Initial)

  async function submitForm (formData: EmployeePrimitives) {
    setFormStatus(FormStatus.Loading)
    toastMessage({ type: 'loading', message: 'Cargando...' })

    try {
      await createEmployee(formData)
      toastMessage({ type: 'success', message: 'Empleado Creado exitosamente' })
      setFormStatus(FormStatus.Success)
    } catch (error: any) {
      toastMessage({ type: 'error', message: error.message })
      console.error('useEmployeeForm', error)
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