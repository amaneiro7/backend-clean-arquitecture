import { TextField } from '../mui/TextField'

interface Props {
  name: string
  type: string
  label: string
  placeholder: string
  handle?: (event: React.ChangeEvent<HTMLInputElement>) => void
  value: string
  isError?: boolean
  error?: string
}
export default function FormInput ({ name, type, placeholder, label, value, handle, isError = false, error }: Props) {
  return (
        <TextField
            required
            fullWidth
            name={name}
            label={label}
            type={type}
            value={value}
            onChange={handle}
            placeholder={placeholder}
            autoComplete={name}
            color='warning'
            error={isError}
            helperText={isError ? error : ''}
        />
  )
}
