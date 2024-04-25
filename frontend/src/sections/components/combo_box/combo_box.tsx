import { PropsWithChildren, useState } from 'react'
import { Autocomplete, AutocompleteProps, createFilterOptions } from '../../mui/Autocomplete'
import { TextField } from '../../mui/TextField'
import { CircularProgress } from '../../mui/CircularProgress '


interface Props {
  id: string
  name: string
  value?: string
  label: string
  loading?: boolean
  options: Options[]
  isHidden?: boolean
  isDisabled?: boolean
  onChange: AutocompleteProps<any, false, false, false>["onChange"]
  isRequired?: boolean
  isError?: boolean
  errorMessage?: string
}

interface Options {
  id: string
  name: string

}

const filter = createFilterOptions()

export default function ComboBox ({ 
  id,
  name,
  label,
  options,
  isDisabled = true,
  loading,
  onChange,
  isRequired = false,
  isError,
  errorMessage,
  children
}: PropsWithChildren<Props>) {
  const [open, setOpen] = useState(false)   
  const [value, setValue] = useState(null)
  const [dialogValue, setDialogValue] = useState({
    title: '',
    year: ''
  })


  const handleClose = () => {
    setDialogValue({
      title: '',
      year: ''
    })
    toggleDialogOpen(false)
  }


  const handleSubmit = (event) => {
    event.preventDefault()
    setValue({
      title: dialogValue.title,
      year: parseInt(dialogValue.year, 10)
    })
    handleClose()
  }

  return (
    <>         
      <Autocomplete
        id={`combo-box-${id}`}
        value={value}
        onChange={(event, newValue, reason, details) => {
          setValue(value)
          onChange(event, newValue, reason, details)          
        }}
        fullWidth
        disabled={isDisabled}
        size='small'
        open={open}
        onOpen={() => { setOpen(true) }}
        onClose={() => { setOpen(false) }}
        isOptionEqualToValue={(option, value) => option.name === value.name}
        getOptionLabel={(option) => option.name}
        options={options}
        loading={loading}
        selectOnFocus
        clearOnBlur
        handleHomeEndKeys
        renderInput={(params) => (
          <TextField
            {...params}
            label={label}
            required={isRequired}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {loading && <CircularProgress color="inherit" size={20} />}
                  {params.InputProps.endAdornment}
                </>
              ),
            }}
            color={isError ? 'warning' : 'primary'}
            error={isError}
            helperText={errorMessage}
          />
        )}
      />
      {children}
    </>
  )
}