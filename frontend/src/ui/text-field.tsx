import { TextField } from '../mui/TextField'

interface Props {
  name: string
  type: string
  label: string
  placeholder: string
  handle?: (event: React.ChangeEvent<HTMLInputElement>) => void
  value: string
  defaultValue?: string
  isError?: boolean
  error?: string
}
export default function FormInput ({ name, value, type, placeholder, handle, defaultValue, label, isError = false, error }: Props) {
  return (
        <TextField
            required
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
