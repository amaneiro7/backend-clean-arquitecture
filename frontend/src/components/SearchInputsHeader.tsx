import { Suspense } from 'react'
import FormInput from '../ui/text-field'
import { Select } from '../ui/select'
import { useFormFieldData } from '../Hooks/useFormData'
import { type SelectChangeEvent } from '@mui/material'

interface Props {
  state: any
  handleChange: ((event: React.ChangeEvent<HTMLInputElement> | SelectChangeEvent<string>, child: React.ReactNode) => void) | undefined
}

export const SearchInputsHeader = ({ state, handleChange }: Props) => {
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
                    name='activo'
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
                    value={state.searchValueModel.value}
                />
            </Suspense>
        </header>
  )
}
