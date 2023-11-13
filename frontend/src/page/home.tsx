import { useDevice } from '../Hooks/useDevice'
import { TableCard } from '../components/TableCard'

function Home () {
  const { device } = useDevice()

  return (
    <>
      <h1>Hello World</h1>
      <TableCard device={device}/>
    </>
  )
}

export default Home
