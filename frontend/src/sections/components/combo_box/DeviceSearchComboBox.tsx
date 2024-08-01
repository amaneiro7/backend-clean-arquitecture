import { lazy, Suspense, useCallback, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import parse from 'autosuggest-highlight/parse'
import match from 'autosuggest-highlight/match'
import debounce from 'just-debounce-it'

import { Autocomplete } from '../../mui/Autocomplete'
import { useSearchDevice } from '../../Hooks/device/useSearchDevice'
import { SearchByCriteriaQuery } from '../../../modules/shared/infraestructure/criteria/SearchByCriteriaQuery'
import { Operator } from '../../../modules/shared/domain/criteria/FilterOperators'
import { InputSkeletonLoading } from '../skeleton/inputSkeletonLoading'

const TextField = lazy(async () => await import("../../mui/TextField").then(m => ({ default: m.TextField })))
const CircularProgress = lazy(async () => await import('../../mui/CircularProgress').then(m => ({ default: m.CircularProgress })))
const CloseIcon = lazy(async () => await import('../../mui/CloseIcon').then(m => ({ default: m.CloseIcon })))
const SearchLink = lazy(async() => import('../button/SearchLink').then(m => ({ default: m.SearchLink })))

export default function DeviceSearchComboBox() {
    const { devices, loading, searchDevices } = useSearchDevice()
    const navigate = useNavigate()
    const location = useLocation()
    const [value, setValue] = useState(null);
    const [inputValue, setInputValue] = useState('');
    const [options, setOptions] = useState([]);
    const [open, setOpen] = useState(false)

    const debounceGetDevices = useCallback(
        debounce((query: SearchByCriteriaQuery) => {
            searchDevices(query)
        }, 500), [])

    useEffect(() => {        
        if (inputValue === '') {
            setOptions(value ? [value] : [])
            return undefined
        }
        debounceGetDevices({
            filters: [{
                field: 'serial',
                operator: Operator.CONTAINS,
                value: inputValue
            }]
        })
    }, [debounceGetDevices, inputValue, value])

    return (
      <div className='md:max-w-xl lg:max-w-2xl w-full gap-2 flex justify-center items-center'>
        <p className='text-black/75'>Buscar: </p>
        <Suspense fallback={<InputSkeletonLoading />}>
          <Autocomplete
            key={location.key}
            id='combobox-search-devices'
            fullWidth
            getOptionLabel={(option) => {
                        if (typeof option === 'string') {
                            return option
                        }
                        return option.serial
                    }}
            filterOptions={(x) => x}
            options={devices}
            autoComplete
            includeInputInList
            filterSelectedOptions
            value={value}
            onChange={(_, newValue) => {
                        setOptions(newValue ? [newValue, ...options] : options)
                        setValue(newValue)
                    }}
            onInputChange={(_, newInputValue) => {
                        setInputValue(newInputValue)
                    }}
            size='small'
            open={open}
            onOpen={() => { setOpen(true) }}
            onClose={() => { setOpen(false) }}
            isOptionEqualToValue={(option, value) => option.serial === value.serial}
            loading={loading}
            clearText='Limpiar'
            loadingText='Cargando...'
            openText='Abrir'
            closeText='Cerrar'
            noOptionsText='No existe'
            selectOnFocus
            clearOnEscape
            clearOnBlur
            handleHomeEndKeys
            clearIcon={<CloseIcon fontSize='small' />}
            renderInput={(params) => (
              <TextField
                {...params}
                label='Busqueda por serial'
                InputProps={{
                                ...params.InputProps,
                                endAdornment: (
                                  <>
                                    {loading && <CircularProgress color='inherit' size={20} />}
                                    {params.InputProps.endAdornment}
                                  </>
                                ),
                            }}
                color='primary'
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault()
                    if (!value) return
                    navigate(`/device/edit/${value?.id}`, {
                      state: { state: value }
                    })
                  }
                }}
              />
            )}
            renderOption={(props, option, { inputValue }) => {
                        const matches = match(option.serial, inputValue, { insideWords: true });
                        const parts = parse(option.serial, matches)
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
        </Suspense>
        <SearchLink 
          state={{state: value}}
          isDisabled={!value}
          to={`/device/edit/${value?.id}`} 
          title='Búsqueda por serial' 
        />
      </div>
    )
}
