import { SelectChangeEvent } from '@mui/material'
import { Autocomplete } from '../mui/Autocomplete'
import { TextField } from '../mui/TextField'
import { type OnHandleChange } from '../../modules/shared/domain/types/types'

interface Props {
  name: string
  value: string | number
  defaultValue?: string | number
  label: string
  options: Options[]
  isHidden?: boolean
  isDisabled?: boolean
  onChange: OnHandleChange
  placeholder: string
  isRequired?: boolean
}

interface Options {
  id: string | number
  name: string | number
}

export default function ComboBox ({
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
  const defaultProps = {
    options,
    getOptionalLabel: (option: Options) => option.name
  }
  const flatProps = {
    options: options.map((option: Options) => option.name)
  }
  return (
        <Autocomplete
            onChange={(event) => {
              const { name, value } = event.target
              onChange(name, value)
            }}
            disablePortal
            id="combo-box-demo"
            {...defaultProps}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Combo box" />}
        />
  )
}
