import { FormContainer } from '../../components/formContainer'
import { useFormDevice } from '../../Hooks/useFormDevice'
import { inputsFormType } from '../../utils/inputsFormType'

export const DeviceForm = () => {
  const {
    device,
    loading,
    categories,
    brands,
    models,
    status,
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
    categoryId: device?.categoryId,
    serial: device?.serial,
    activo: device?.activo,
    statusOptions: status,
    status: device?.status,
    brands,
    brandId: device?.brandId,
    models,
    modelId: device?.modelId,
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
