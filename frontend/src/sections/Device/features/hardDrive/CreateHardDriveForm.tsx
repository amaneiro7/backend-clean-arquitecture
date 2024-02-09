import { type FormEvent, useEffect, useState } from 'react'
import { useGenericFormData } from '../../../Hooks/useGenericFormData'
import { useHardDriveForm } from './useHardDriveForm'
import { FormContainer } from '../../../components/formContainer'
import CategorySelect from '../../category/CategorySelect'
import HealthInput from './HealthInput'
import HardDriveTypeSelect from './HardDriveTypeSelect'
import HardDriveCapacitySelect from './HardDriveCapacitySelect'

const initialState = {
  categoryId: 1,
  deviceId: '',
  health: 100,
  hardDriveTypeId: 1,
  hardDriveCapacityId: 1
}

export default function CreateHardDriveForm () {
  const { formData, updateForm, resetFrom } = useGenericFormData(initialState)
  const { formStatus, submitForm, resetFormStatus } = useHardDriveForm()
  const [errors, setErrors] = useState(initialState)

  useEffect(() => {
    // const isHealth = HardDriveHealth.isValid(formData.health)

    setErrors({
      ...errors

    })
  }, [formData])

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    const { categoryId, deviceId, health, hardDriveTypeId, hardDriveCapacityId } = formData
    await submitForm({ categoryId, deviceId, health, hardDriveTypeId, hardDriveCapacityId })
  }

  const handleClose = () => {
    window.history.back()
  }

  const handleChange = (ev: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    updateForm({ [ev.target.name]: ev.target.value })
  }

  return (
    <FormContainer
        title='Agrega un nuevo Disco Duro'
        handleSubmit={handleSubmit}
        handleClose={handleClose}
        isDisabled
    >
      <CategorySelect
        value={formData.categoryId}
        onChange={handleChange}
      />
      <HealthInput
        value={formData.health}
        onChange={handleChange}
      />
      <HardDriveTypeSelect
        value={formData.hardDriveTypeId}
        onChange={handleChange}
      />
      <HardDriveCapacitySelect
        value={formData.hardDriveCapacityId}
        onChange={handleChange}
      />
    </FormContainer>
  )
}
