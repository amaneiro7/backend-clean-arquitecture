import { TableCard } from './components/TableCard'
import { useDevice } from './Hooks/useDevice'

function App () {
  const { device } = useDevice()

  return (
    <>
      <h1>Hello World</h1>
      <TableCard device={device}/>
    </>
  )
}

export default App
