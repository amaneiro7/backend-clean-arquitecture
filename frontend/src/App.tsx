import { useEffect, useState } from 'react'
import { type Device } from './types/types'

function App () {
  const [device, setDevice] = useState<Device[]>([])
  useEffect(() => {
    fetch('http://localhost:3000/api/v1/device')
      .then(async res => await res.json())
      .then(res => { setDevice(res.body) })
      .catch(err => {
        console.error(err)
      })

    return () => {
      setDevice([])
    }
  }, [])

  return (
    <>
      <h1>Hello World</h1>
      <div className='rounded-2xl p-6 m-4 border-2 border-solid shadow-md text-left'>
        <div className='overflow-x-auto overflow-y-auto pb-2'>
          <table className='w-full border-collapse table-fixed'>
            <thead className='sticky'>
              <tr className=''>
                <th>Categoria</th>
                <th>serial</th>
                <th>activo</th>
                <th>status</th>
                <th>Marca</th>
                <th>Modelo</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {device.map((item) => (
                <tr key={item.id}>
                  <td>{item.model.category.name}</td>
                  <td>{item.serial}</td>
                  <td>{item.activo}</td>
                  <td>{item.status}</td>
                  <td>{item.model.brand.name}</td>
                  <td>{item.model.name}</td>
                  <td>
                    <a href='#'>Editar</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default App
