import { Link } from 'react-router-dom'

export default function Footer () {
  return (
    <footer className='w-full bg-slate-700 flex justify-center p-2'>
      <p className='text-center text-xs text-white'>
        {'Hecho por Andres Maneiro, amaneiro7@gmail.com - Copyright © '}
        <Link to='https://mui.com/'>InventarioAPP </Link>
        {`2024-${new Date().getFullYear()}.`}
      </p>
    </footer>
  )
}
