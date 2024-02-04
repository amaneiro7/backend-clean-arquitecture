import { useState } from 'react'

export const useGenericFormData = <T>(
  initialState: T
): {
    formData: T
    updateForm: (value: Partial<T>) => void
    resetFrom: () => void
  } => {
  const [formData, setFormData] = useState(initialState)

  const updateForm = (value: Partial<typeof initialState>) => {
    setFormData(oldState => {
      return { ...oldState, ...value }
    })
  }

  const resetFrom = () => {
    setFormData(initialState)
  }

  return {
    formData,
    updateForm,
    resetFrom
  }
}
