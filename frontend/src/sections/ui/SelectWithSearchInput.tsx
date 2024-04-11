import { type SelectChangeEvent } from '@mui/material'
import SearchInput from './SearchInput'
import Select from './Select'
import { useState } from 'react'

interface Props {
  name: string
  value: string | number
  defaultValue?: string | number
  label: string
  options: Options[]
  isHidden?: boolean
  isDisabled?: boolean
  onChange: (event: SelectChangeEvent, child: React.ReactNode) => void
  placeholder: string
  isRequired?: boolean
}

interface Options {
  id: string | number
  name: string | number
}

export default function SelectWithSearchInput ({
  name,
  value,
  defaultValue,
  label,
  options,
  isHidden = true,
  isDisabled = true,
  onChange,
  placeholder,
  isRequired = false
}: Props) {
  const [input, setInput] = useState<string>('')
  const filteroptiosn = options.map((option) => option.name)
  return (
     <>
      <SearchInput />
      <Select
        label={label}
        value={value}
        defaultValue={defaultValue}
        name={name}
        onChange={onChange}
        options={options}
        isHidden={isHidden}
        isDisabled={isDisabled}
        placeholder={placeholder}
        isRequired={isRequired}
      />
    </>

  )
}
