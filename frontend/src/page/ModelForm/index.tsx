import { useFormModel } from '../../Hooks/useFormModel'
import { FormContainer } from '../../components/formContainer'
import { inputsFormType } from '../../utils/inputsFormType'

export const ModelForm = () => {
  const {
    model: {
      name: modelName,
      categoryId,
      brandId
    },
    brands,
    categories,
    formMethod,
    handleChange,
    handleClose,
    handleSave,
    handleUpdate,
    loadFetching,
    loading
  } = useFormModel()

  const inputsForm = inputsFormType({
    formType: 'model',
    modelName,
    brandId,
    brands,
    categoryId,
    categories,
    onChange: handleChange
  })

  return (
    <FormContainer
      inputsForm={inputsForm}
      isDisabled={loadFetching}
      isLoading={loading}
      onClose={handleClose}
      onSubmit={formMethod === 'edit' ? handleUpdate : handleSave}
      title={`${formMethod === 'edit' ? 'Edita el Modelo' : 'Agrega un nuevo'} Modelo`}
    />
  )
}

export default ModelForm
