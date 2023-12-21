import { type InputTypeProps } from '../types/types'

export const inputsFormType = ({
  formType = 'device',
  onChange,
  categoryName,
  brandName,
  modelName,
  categoryId = '',
  brandId = '',
  modelId = '',
  status = '',
  activo = '',
  serial = '',
  categories = [],
  brands = [],
  models = [],
  statusOptions = []
}: InputTypeProps) => {
  const categorySelectInput = {
    type: 'select',
    name: 'categoryId',
    value: categoryId,
    label: 'Categoria del Dispositivo',
    options: categories,
    onChange,
    placeholder: '-- Seleccione la Categoria --'
  }

  const brandSelectInput = {
    type: 'select',
    name: 'brandId',
    value: brandId,
    label: 'Marca del Dispositivo',
    options: brands,
    onChange,
    placeholder: '-- Seleccione la Marca --'
  }

  const modelSelectInput = {
    type: 'select',
    name: 'modelId',
    value: modelId,
    label: 'Modelo del Dispositivo',
    options: models,
    onChange,
    placeholder: '-- Seleccione el Modelo --'
  }

  const statusInput = {
    type: 'select',
    name: 'status',
    value: status,
    label: 'Estado del Dispositivo',
    options: statusOptions,
    onChange,
    placeholder: '-- Seleccione el Estado --'
  }

  const activoInput = {
    type: 'text',
    name: 'activo',
    label: 'Activo',
    placeholder: activo,
    value: activo,
    onChange
  }

  const serialInput = {
    type: 'text',
    name: 'serial',
    label: 'Serial',
    placeholder: serial,
    value: serial,
    onChange
  }

  const inputsBrand = {
    type: 'text',
    name: 'name',
    label: 'Nombre de la Marca',
    placeholder: '-- Ingrese el Nombre de la Marca --',
    value: brandName,
    onChange
  }
  const inputsCategory = {
    type: 'text',
    name: 'name',
    label: 'Nombre de la Categoria',
    placeholder: '-- Ingrese el Nombre de la Categoria --',
    value: categoryName,
    onChange
  }
  const inputsModel = {
    type: 'text',
    name: 'name',
    label: 'Nombre del Modelo',
    placeholder: '-- Ingrese el Nombre del Modelo --',
    value: modelName,
    onChange
  }
  const InputsType = {
    device: [
      categorySelectInput,
      serialInput,
      activoInput,
      statusInput,
      brandSelectInput,
      modelSelectInput
    ],
    category: [
      inputsCategory
    ],
    brand: [
      inputsBrand
    ],
    model: [
      categorySelectInput,
      brandSelectInput,
      inputsModel
    ]
  }

  return InputsType[formType]
}
