import { TextField } from '../../mui/TextField'

interface Props {
  id: string
  name: string
  type: string
  label: string
  placeholder: string
  handle: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  value: string
  defaultValue?: string
  isRequired?: boolean
  isError?: boolean
  errorMessage?: string
}
export default function FormInput ({ id, name, value, type, placeholder, handle, defaultValue, label, isRequired = false, isError = false, errorMessage }: Props) {
  return (
        <TextField
            id={id}
            required={isRequired}
            fullWidth
            size='small'
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
            helperText={errorMessage}
        />
  )
}
