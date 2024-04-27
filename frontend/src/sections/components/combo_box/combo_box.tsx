import React, { PropsWithChildren, useState } from 'react'
import { Autocomplete, AutocompleteProps } from '../../mui/Autocomplete'
import { TextField } from '../../mui/TextField'
import { CircularProgress } from '../../mui/CircularProgress '
import { createFilterOptions } from '@mui/material'
import { CloseIcon } from '../../mui/CloseIcon';
import parse from 'autosuggest-highlight/parse'
import match from 'autosuggest-highlight/match'


interface Props {
  id: string
  initialValue?: any | null
  name: string
  label: string
  loading?: boolean
  options: Options[]
  isHidden?: boolean
  isDisabled?: boolean
  onChange: AutocompleteProps<any, false, false, false>["onChange"]
  isRequired?: boolean
  isError?: boolean
  errorMessage?: string
  type?: 'form' | 'search'
}

interface Options {
  inputValue?: string
  id: string
  name: string

}

const filter = createFilterOptions()
export default function ComboBox ({ 
  id,
  name,
  initialValue = null,  
  label,
  options,
  isDisabled = true,
  loading,
  onChange,
  isRequired = false,
  isError,
  errorMessage,
  children,
  type = 'search'
}: PropsWithChildren<Props>) {
  const [open, setOpen] = useState(false)
  
  return (
    <>         
      <Autocomplete
        id={`combo-box-${id}`}
        value={initialValue}
        defaultValue={'Combobox'}
        onChange={(event, newValue, reason, details) => {
          // setValue(newValue)
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
        
        clearText='Limpiar'
        loadingText='Cargando...'
        openText='Abrir'
        closeText='Cerrar'
        selectOnFocus
        clearOnEscape
        clearOnBlur
        handleHomeEndKeys
        clearIcon={<CloseIcon fontSize='small' />}
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
        renderOption={(props, option, { inputValue }) => {
          const matches = match(option.name, inputValue, { insideWords: true });
          const parts: ParseType[] = parse(option.name, matches)
          return <RenderOption parts={parts} props={props} />;
        }}
      />
      {children}
    </>
  )
}

interface ParseType {
  text: string
  highlight: boolean
}

function RenderOption ({parts, props}: {parts: ParseType[], props: React.HTMLAttributes<HTMLLIElement>}) {
  return(    
    <li {...props}>
      <div>
        {parts.map((part, index) => (
          <span
            key={`${part.text}-${index}`}
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
}