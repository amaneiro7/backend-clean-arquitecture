import { useDevice } from '../Hooks/useDevice'
import { TableCard } from '../components/TableCard'
import { useNavigate } from 'react-router-dom'
import { Button } from '../ui/button'
import { SearchInputsHeader } from '../components/SearchInputsHeader'
import { useReducer } from 'react'

const initialState = {
  searchValueCategory: {
    value: '',
    dbReferences: 'categoryId',
    typeOfValue: 'number'
  },
  searchValueSerial: {
    value: '',
    dbReferences: 'serial',
    typeOfValue: 'string'
  },
  searchValueActivo: {
    value: '',
    dbReferences: 'activo',
    typeOfValue: 'string'
  },
  searchValueBrand: {
    value: '',
    dbReferences: 'brandId',
    typeOfValue: 'number'
  },
  searchValueModel: {
    value: '',
    dbReferences: 'modelId',
    typeOfValue: 'number'
  },
  statusInput: {
    value: '',
    dbReferences: 'status',
    typeOfValue: 'string'
  },
  params: ''
}

const reducer = (state, action) => {
  return reducerObject(state, action.payload)[action.type] || state
}

const actionType = {
  changeValue: 'CHANGE_VALUE',
  params: 'PARAMS'
}

const reducerObject = (state, payload) => ({
  [actionType.changeValue]: {
    ...state,
    [payload?.name]: {
      ...state[payload?.name],
      value: payload?.value
    }
  },
  [actionType.params]: {
    ...state,
    params: {

    }
  }
})

function Home () {
  const [state, dispatch] = useReducer(reducer, initialState)
  const { device } = useDevice()
  const navigate = useNavigate()
  // const [searchParams, setSearchParams] = useSearchParams()

  const handleChange = ({ target }) => {
    const { name, value } = target
    dispatch({ type: actionType.changeValue, payload: { name, value } })
    // const params = { [state[name].dbReferences]: value }
    // setSearchParams(params)
  }

  return (
    <main className='max-w-full h-full flex flex-col gap-5 p-5'>
      <div>
        <h1 className='text-lg text-primary font-bold'>InventarioAPP</h1>
      </div>
      <Button
        type='button'
        text='Agregar un nuevo item'
        actionType='ACTION'
        handle={() => { navigate('addnewdevice') }}
      />
      <SearchInputsHeader
        state={state}
        handleChange={handleChange}
      />
      <TableCard device={device}/>
    </main>
  )
}

export default Home
