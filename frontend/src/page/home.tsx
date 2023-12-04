import { useDevice } from '../Hooks/useDevice'
import { TableCard } from '../components/TableCard'
import { useNavigate } from 'react-router-dom'
import { Button } from '../ui/button'
import { SearchInputsHeader } from '../components/SearchInputsHeader'

function Home () {
  const { device } = useDevice()
  const navigate = useNavigate()

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
      <SearchInputsHeader />
      <TableCard device={device}/>
    </main>
  )
}

export default Home
