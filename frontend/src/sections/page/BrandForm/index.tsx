import { useFormBrand } from '../../Hooks/useFormBrand'
import { FormContainer } from '../../components/formContainer'
import { inputsFormType } from '../../utils/inputsFormType'

export const BrandForm = () => {
  const {
    brand,
    formMethod,
    handleChange,
    handleClose,
    handleSave,
    handleUpdate,
    loadFetching,
    loading
  } = useFormBrand()

  const inputsForm = inputsFormType({
    formType: 'brand',
    brandName: brand,
    onChange: handleChange
  })

  return (
    <FormContainer
      inputsForm={inputsForm}
      isDisabled={loadFetching}
      isLoading={loading}
      onClose={handleClose}
      onSubmit={formMethod === 'edit' ? handleUpdate : handleSave}
      title={`${formMethod === 'edit' ? 'Edita la Marca' : 'Agrega una nueva'} Marca`}
    />
  )
}

export default BrandForm
