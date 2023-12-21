import { Brand, Category, MappedDevice, MappedStatus, Model } from "../types/types"

interface Props { DeviceFormProps | BrandFormProps | CategoryFormProps | ModelFormProps }

interface DeviceFormProps {
    formType: 'device'
    device: MappedDevice[]
    categories: Category[]
    brands: Brand[]
    models: Model[]
    status: MappedStatus[]
    onChange: any
}
interface BrandFormProps {
    formType: 'brand'
    brand: string
    onChange: any
}
interface CategoryFormProps {
    formType: 'category'
    category: string
    onChange: any
}
interface ModelFormProps {
    formType: 'model'
    model: string
    categories: Category[]
    brands: Brand[]
    onChange: any
}

const inputsFormType = ({
    formType = 'brand', 
    onChange, 
    device = [],
    brand = [],
    category = [],
    model = [],
    categories = [],
    brands = [],
    models = [],
    status = []
}: Props) => 
{
    return InputsType[formType]()

}



const categorySelectInput = {
    type: 'select',
    name: 'categoryId',
    value: device?.categoryId,
    label: 'Categoria del Dispositivo',
    options: categories,
    onChange,
    placeholder: '-- Seleccione la Categoria --'
  },

  const brandSelectInput = ({}) => {
    type: 'select',
    name: 'brandId',
    value: device?.brandId,
    label: 'Marca del Dispositivo',
    options: brands,
    onChange,
    placeholder: '-- Seleccione la Marca --'
  }

  const modelSelectInput = 
  {
    type: 'select',
    name: 'modelId',
    value: device?.modelId,
    label: 'Modelo del Dispositivo',
    options: models,
    onChange,
    placeholder: '-- Seleccione el Modelo --'
  }

  const statusInput = {
    type: 'select',
    name: 'status',
    value: device?.status,
    label: 'Estado del Dispositivo',
    options: status,
    onChange,
    placeholder: '-- Seleccione el Estado --'
  }

  const activoInput = {
    type: 'text',
    name: 'activo',
    label: 'Activo',
    placeholder: device?.activo,
    value: device?.activo,
    onChange
  }

  const serialInput = {
    type: 'text',
    name: 'serial',
    label: 'Serial',
    placeholder: device?.serial,
    value: device?.serial,
    onChange
  }

  const inputsBrand = {
    type: 'text',
    name: 'name',
    label: 'Nombre de la Marca',
    placeholder: ,
    value: ,
    handleChange
  }
  const inputsCategory = {
    type: 'text',
    name: 'name',
    label: 'Nombre de la Categoria',
    placeholder: ,
    value: ,
    handleChange
  }
  const inputsModel = {
    type: 'text',
    name: 'name',
    label: 'Nombre del Modelo',
    placeholder: ,
    value: ,
    handleChange
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
        inputsCategory
    ],
    model: [
        categorySelectInput,
        brandSelectInput,
        modelSelectInput
    ]
} as const

