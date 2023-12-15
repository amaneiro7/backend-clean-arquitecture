// import { TableCard } from '../components/TableCard'
import { useNavigate } from 'react-router-dom'
import { useGetSearch } from '../Hooks/useGetSearch'
import { Suspense, lazy } from 'react'

const TableCard = lazy(async () => await import('../components/TableCard'))
const SearchInputsHeader = lazy(async () => await import('../components/SearchInputsHeader'))
const Button = lazy(async () => await import('../ui/button'))
function Home () {
  const { device, state, handleChange } = useGetSearch()
  const navigate = useNavigate()
  // const [searchParams, setSearchParams] = useSearchParams()

  return (
    <main className='max-w-full h-full flex flex-col gap-5 p-5'>
      <div>
        <h1 className='text-lg text-primary font-bold'>InventarioAPP</h1>
      </div>
      <Suspense>
        <Button
          type='button'
          text='Agregar un nuevo item'
          actionType='ACTION'
          handle={() => { navigate('addnewdevice') }}
        />
      </Suspense>
      <Suspense>
        <SearchInputsHeader
          state={state}
          handleChange={handleChange}
        />
      </Suspense>
      <Suspense>
        <TableCard device={device}/>
      </Suspense>
    </main>
  )
}

export default Home
