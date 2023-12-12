import { type SelectChangeEvent } from '@mui/material'
import { TextField } from '../../mui/TextField'

interface Props {
  name: string
  type: string
  label: string
  placeholder: string
  handle?: ((event: React.ChangeEvent<HTMLInputElement> | SelectChangeEvent<string> | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, child: React.ReactNode) => void) | undefined
  value: string
  defaultValue?: string
  isRequired?: boolean
  isError?: boolean
  error?: string
}
export default function FormInput ({ name, value, type, placeholder, handle, defaultValue, label, isRequired = false, isError = false, error }: Props) {
  return (
        <TextField
            required={isRequired}
            fullWidth
            name={name}
            value={value}
            label={label}
            type={type}
            onChange={handle}
            placeholder={placeholder}
            autoComplete={name}
            defaultValue={defaultValue}
            color={isError ? 'warning' : 'primary'}
            error={isError}
            helperText={isError ? error : ''}
        />
  )
}
