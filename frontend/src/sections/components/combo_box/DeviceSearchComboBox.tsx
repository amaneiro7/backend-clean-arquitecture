import { lazy, Suspense, useCallback, useEffect, useLayoutEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import parse from 'autosuggest-highlight/parse'
import match from 'autosuggest-highlight/match'
import debounce from 'just-debounce-it'

import { Autocomplete } from '../../mui/Autocomplete'
import { useSearchDevice } from '../../Hooks/device/useSearchDevice'
import { SearchByCriteriaQuery } from '../../../modules/shared/infraestructure/criteria/SearchByCriteriaQuery'
import { Operator } from '../../../modules/shared/domain/criteria/FilterOperators'

const TextField = lazy(async () => await import("../../mui/TextField").then(m => ({ default: m.TextField })))
const CircularProgress = lazy(async () => await import('../../mui/CircularProgress').then(m => ({ default: m.CircularProgress })))
const CloseIcon = lazy(async () => await import('../../mui/CloseIcon').then(m => ({ default: m.CloseIcon })))
const RightIcon = lazy(async () => import('../icon/RightIcon').then(m => ({ default: m.RightIcon })))

export default function DeviceSearchComboBox() {
    const { devices, loading, searchDevices } = useSearchDevice()
    const location = useLocation()
    const [value, setValue] = useState(null);
    const [inputValue, setInputValue] = useState('');
    const [options, setOptions] = useState([]);
    const [open, setOpen] = useState(false)

    const debounceGetDevices = useCallback(
        debounce((query: SearchByCriteriaQuery) => {
            searchDevices(query)
        }, 500)
        , [searchDevices, inputValue]
    )

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
    }, [inputValue])

    useLayoutEffect(() => {
        setInputValue('')
        setValue(null)
    }, [location.pathname])

    return (
        <div className='w-full flex justify-center items-center'>
            <Suspense>
                <Autocomplete
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
                    placeholder='Busque por serial'
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
                    clearIcon={<Suspense><CloseIcon fontSize='small' /></Suspense>}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label='Busqueda por serial'
                            InputProps={{
                                ...params.InputProps,
                                endAdornment: (
                                    <>
                                        {loading && <Suspense><CircularProgress color="inherit" size={20} /></Suspense>}
                                        {params.InputProps.endAdornment}
                                    </>
                                ),
                            }}
                            color='primary'
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
            <RightIcon isDisabled={!value}>
                {value && <Link
                    to={`/device/edit/${value?.id}`}
                    state={{ state: value }}
                    className='absolute w-full h-full'
                >
                </Link>}
            </RightIcon>
        </div>
    )
}
