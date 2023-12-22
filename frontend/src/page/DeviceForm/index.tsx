import { FormContainer } from '../../components/formContainer'
import { useFormDevice } from '../../Hooks/useFormDevice'
import { inputsFormType } from '../../utils/inputsFormType'

export const DeviceForm = () => {
  const {
    device: {
      categoryId,
      serial,
      activo,
      status,
      brandId,
      modelId
    },
    loading,
    categories,
    brands,
    models,
    status: statusOptions,
    formMethod,
    loadFetching,
    handleChange,
    handleSave,
    handleUpdate,
    handleClose
  } = useFormDevice()

  const inputsForm = inputsFormType({
    formType: 'device',
    categories,
    categoryId,
    serial,
    activo,
    statusOptions,
    status,
    brands,
    brandId,
    models,
    modelId,
    onChange: handleChange
  })

  return (
    <FormContainer
      inputsForm={inputsForm}
      isDisabled={loadFetching}
      isLoading={loading}
      onClose={handleClose}
      onSubmit={formMethod === 'edit' ? handleUpdate : handleSave}
      title={`${formMethod === 'edit' ? 'Edita el dispositivo' : 'Agrega un nuevo'} Dispositivo`}
    />
  )
}

export default DeviceForm
