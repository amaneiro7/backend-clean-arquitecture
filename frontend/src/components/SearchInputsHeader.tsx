import { Suspense, useState } from 'react'
import FormInput from '../ui/text-field'
import { Select } from '../ui/select'
import { useCategories } from '../Hooks/useCategories'

export const SearchInputsHeader = () => {
  const [serial, setSerial] = useState('')
  const { categories } = useCategories()

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    event.preventDefault()
    setSerial(event.target.value)
  }
  return (
        <header className="grid grid-cols-[repeat(auto-fit,_250px)] gap-5 place-content-center">
            <Suspense>
                <Select
                    label='Categoria'
                    name='cateoryId'
                    onChange={handleChange}
                    options={categories}
                    placeholder='-- Filtre por Categoria --'
                    value=''
                />
            </Suspense>
            <Suspense>
                <FormInput
                    label='Serial'
                    name='serial'
                    placeholder='-- Filtre por Serial --'
                    type='text'
                    value={serial}
                    handle={handleChange}
                />
            </Suspense>
            <Suspense>
                <FormInput
                    label='Activo'
                    name='activo'
                    placeholder='-- Filtre por Activo --'
                    type='text'
                    value={serial}
                    handle={handleChange}
                />
            </Suspense>
            <Suspense>
                <Select
                    label='Status'
                    name='statusId'
                    onChange={handleChange}
                    options={categories}
                    placeholder='-- Filtre por Estado --'
                    value=''
                />
            </Suspense>
            <Suspense>
                <Select
                    label='Marca'
                    name='marcaId'
                    onChange={handleChange}
                    options={categories}
                    placeholder='-- Filtre por Marca --'
                    value=''
                />
            </Suspense>
            <Suspense>
                <Select
                    label='Modelo'
                    name='modeloId'
                    onChange={handleChange}
                    options={categories}
                    placeholder='-- Filtre por Modelo --'
                    value=''
                />
            </Suspense>
        </header>
  )
}
