import { useRef } from 'react'
import { useDevice } from '../Hooks/useDevice'
import { TableCard } from '../components/TableCard'
import { useNavigate } from 'react-router-dom'
import { Button } from '../ui/button'

function Home () {
  const { device } = useDevice()
  const tableRef = useRef(null)
  const navigate = useNavigate()

  const exportExcel = () => {
    import('../Hooks/useExportExcel').then(module =>
      module.exportExcel(tableRef.current))
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
      <Button
        type='button'
        text='Exportar'
        actionType='SAVE'
        handle={exportExcel}
      />
      <TableCard device={device}/>
    </main>
  )
}

export default Home
