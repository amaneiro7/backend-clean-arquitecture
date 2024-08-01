import { lazy, Suspense, useCallback, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import parse from 'autosuggest-highlight/parse'
import match from 'autosuggest-highlight/match'
import debounce from 'just-debounce-it'

import { Autocomplete } from '../../mui/Autocomplete'
import { SearchByCriteriaQuery } from '../../../modules/shared/infraestructure/criteria/SearchByCriteriaQuery'
import { Operator } from '../../../modules/shared/domain/criteria/FilterOperators'
import { useSearchEmployee } from '../../Hooks/employee/useSearchEmployee'

const TextField = lazy(async () => await import("../../mui/TextField").then(m => ({ default: m.TextField })))
const CircularProgress = lazy(async () => await import('../../mui/CircularProgress').then(m => ({ default: m.CircularProgress })))
const CloseIcon = lazy(async () => await import('../../mui/CloseIcon').then(m => ({ default: m.CloseIcon })))
const SearchLink = lazy(async() => import('../button/SearchLink').then(m => ({ default: m.SearchLink })))

export const EmployeeSearchComboBox = () => {
    const { employees, loading, searchEmployees } = useSearchEmployee()
    const navigate = useNavigate()
    const location = useLocation()
    const [value, setValue] = useState(null);
    const [inputValue, setInputValue] = useState('');
    const [options, setOptions] = useState([]);
    const [open, setOpen] = useState(false)

    const debounceGetDevices = useCallback(
        debounce((query: SearchByCriteriaQuery) => {
            searchEmployees(query)
        }, 500)
        , [searchEmployees, inputValue]
    )    

    useEffect(() => {
        if (inputValue === '') {
            setOptions(value ? [value] : [])
            return undefined
        }
        debounceGetDevices({
            filters: [{
                field: 'userName',
                operator: Operator.CONTAINS,
                value: inputValue
            }]
        })
    }, [debounceGetDevices, inputValue, value])

    return (
      <div className='md:max-w-xl lg:max-w-2xl w-full gap-2 flex justify-center items-center'>
        <p className='text-black/75'>Buscar: </p>
        <Suspense>
          <Autocomplete
            key={location.pathname}
            id='combobox-search-devices'
            fullWidth
            getOptionLabel={(option) => {
                        if (typeof option === 'string') {
                            return option
                        }
                        return option.userName
                    }}
            filterOptions={(x) => x}
            options={employees}
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
            isOptionEqualToValue={(option, value) => option.userName === value.userName}
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
                label='Busqueda por Usuario'
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
                    navigate(`/employee/edit/${value?.id}`, {
                      state: value
                    })
                  }
                }}
              />
                    )}
            renderOption={(props, option, { inputValue }) => {
                        const matches = match(option.userName, inputValue, { insideWords: true });
                        const parts = parse(option.userName, matches)
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
          state={value}
          isDisabled={!value}          
          to={`/employee/edit/${value?.id}`}
          title='Búsqueda por usuario de empleado' 
        />
      </div>
    )
}
