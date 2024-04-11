import { Suspense, lazy } from 'react'
import { useFormFieldData } from '../../Hooks/useFormData'
import { type SelectChangeEvent } from '@mui/material'

interface Props {
  state: any
  handleChange: ((event: React.ChangeEvent<HTMLInputElement> | SelectChangeEvent<string> | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, child: React.ReactNode) => void) | undefined
}

const Select = lazy(async () => await import('../../ui/Select'))
const FormInput = lazy(async () => await import('../../ui/text-field'))

const SearchInputsHeader = ({ state, handleChange }: Props) => {
  const {
    categories,
    brands,
    models,
    status
  } = useFormFieldData({
    categoryId: state.searchValueCategory.value,
    brandId: state.searchValueBrand.value
  })

  return (
        <header className="grid grid-cols-[repeat(auto-fit,_250px)] gap-5 place-content-center">
            <Suspense>
                <Select
                    label='Categoria'
                    name='searchValueCategory'
                    onChange={handleChange}
                    options={categories}
                    placeholder='-- Filtre por Categoria --'
                    isHidden={true}
                    isDisabled={false}
                    value={state.searchValueCategory.value}
                />
            </Suspense>
            <Suspense>
                <FormInput
                    label='Serial'
                    name='searchValueSerial'
                    placeholder='-- Filtre por Serial --'
                    type='text'
                    value={state.searchValueSerial.value}
                    handle={handleChange}
                />
            </Suspense>
            <Suspense>
                <FormInput
                    label='Activo'
                    name='searchValueActivo'
                    placeholder='-- Filtre por Activo --'
                    type='text'
                    value={state.searchValueActivo.value}
                    handle={handleChange}
                />
            </Suspense>
            <Suspense>
                <Select
                    label='Status'
                    name='statusInput'
                    onChange={handleChange}
                    options={status}
                    placeholder='-- Filtre por Estado --'
                    isHidden={false}
                    isDisabled={false}
                    value={state.statusInput.value}
                    />
            </Suspense>
            <Suspense>
                <Select
                    label='Marca'
                    name='searchValueBrand'
                    onChange={handleChange}
                    options={brands}
                    placeholder='-- Filtre por Marca --'
                    isHidden={false}
                    isDisabled={false}
                    value={state.searchValueBrand.value}
                    />
            </Suspense>
            <Suspense>
                <Select
                    label='Modelo'
                    name='searchValueModel'
                    onChange={handleChange}
                    options={models}
                    placeholder='-- Filtre por Modelo --'
                    isHidden={false}
                    isDisabled={false}
                    value={state.searchValueModel.value}
                />
            </Suspense>
        </header>
  )
}

export default SearchInputsHeader
