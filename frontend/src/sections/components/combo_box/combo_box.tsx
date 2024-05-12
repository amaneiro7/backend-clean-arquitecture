import { lazy, PropsWithChildren, Suspense, useState } from 'react'
import { createFilterOptions } from '@mui/material'
import parse from 'autosuggest-highlight/parse'
import match from 'autosuggest-highlight/match'
import { Autocomplete, AutocompleteProps } from '../../mui/Autocomplete'

// const Autocomplete = lazy(async () => await import("../../mui/Autocomplete").then(m => ({ default: m.Autocomplete })))
const TextField = lazy(async () => await import("../../mui/TextField").then(m => ({ default: m.TextField })))
const CircularProgress = lazy(async () => await import('../../mui/CircularProgress').then(m => ({ default: m.CircularProgress })))
const CloseIcon = lazy(async () => await import('../../mui/CloseIcon').then(m => ({ default: m.CloseIcon })))

interface Props  {
  id: string
  initialValue?: any | null
  name: string
  freeSolo?: boolean
  readonly?: boolean
  label: string
  loading?: boolean
  options: Options[]
  isHidden?: boolean
  isDisabled?: boolean
  onChange: AutocompleteProps<any, false, false, false>["onChange"]
  isRequired?: boolean
  placeholder?: string
  isError?: boolean
  errorMessage?: string
  type?: 'form' | 'search'
}



interface Options {
  inputValue?: string
  id: string
  name: string
  [key: string]: any
}

const filter = createFilterOptions()
export default function ComboBox({
  id,
  name,
  initialValue = null,
  label,
  options,
  isDisabled = true,
  freeSolo = false,
  loading,
  placeholder,
  onChange,
  isRequired = false,
  isError,
  errorMessage,
  children,
  type = 'search',
  readonly = false
}: PropsWithChildren<Props>) {
  const [open, setOpen] = useState(false)

  return (
    <Suspense>
      <Autocomplete
        id={`combo-box-${id}`}
        value={initialValue}
        freeSolo={freeSolo}
        onChange={(event, newValue, reason, details) => {
          onChange(event, newValue, reason, details)
        }}
        filterOptions={(options, params) => {
          const filtered = filter(options, params)
          const { inputValue } = params
          const isExisting = options.some((option) => inputValue === option.name)
          if (inputValue !== '' && !isExisting && type !== 'search') {
            filtered.push({
              inputValue,
              name: `Añadir "${inputValue}"`,
            })
          }
          return filtered
        }}
        fullWidth
        placeholder={placeholder}
        disabled={isDisabled}
        size='small'
        open={open}
        onOpen={() => { setOpen(true) }}
        onClose={() => { setOpen(false) }}
        isOptionEqualToValue={(option, value) => option.name === value.name}
        getOptionLabel={(option) => {
          if (typeof option === 'string') {
            return option
          }
          if (option.inputValue) {
            return option.inputValue
          }
          return option.name
        }}
        options={options}
        loading={loading}
        readOnly={readonly}
        clearText='Limpiar'
        loadingText='Cargando...'
        openText='Abrir'
        closeText='Cerrar'
        noOptionsText='No existe'
        selectOnFocus
        clearOnEscape
        clearOnBlur        
        handleHomeEndKeys        
        clearIcon={<Suspense><CloseIcon fontSize='small' /></Suspense>}
        renderInput={(params) => (
          <TextField
            {...params}
            label={label}
            name={name}
            required={isRequired}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {loading && <Suspense><CircularProgress color="inherit" size={20} /></Suspense>}
                  {params.InputProps.endAdornment}
                </>
              ),
            }}
            color={isError ? 'warning' : 'primary'}
            error={isError}
            helperText={errorMessage}
          />
        )}
        renderOption={(props, option, { inputValue }) => {
          const matches = match(option.name, inputValue, { insideWords: true });
          const parts = parse(option.name, matches)
          return (
            <li {...props}>
              <div>
                {parts.map((part, index) => (
                  <span
                    key={index}
                    style={{
                      fontWeight: part.highlight ? 700 : 400,
                    }}
                  >
                    {part.text}
                  </span>
                ))}
              </div>
            </li>
          )
        }}
      />
      {children}
    </Suspense>
  )
}
