// import { TableCard } from '../components/TableCard'
import { useNavigate } from 'react-router-dom'
import { Button } from '../ui/button'
import { SearchInputsHeader } from '../components/SearchInputsHeader'
import { useGetSearch } from '../Hooks/useGetSearch'
import { Suspense, lazy } from 'react'

const TableCard = lazy(async () => await import('../components/TableCard'))

function Home () {
  const { device, state, handleChange } = useGetSearch()
  const navigate = useNavigate()
  // const [searchParams, setSearchParams] = useSearchParams()

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
      <Suspense>
        <TableCard device={device}/>
      </Suspense>
    </main>
  )
}

export default Home
