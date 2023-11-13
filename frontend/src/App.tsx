import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Login from './page/login.tsx'
import Home from './page/home.tsx'
import EditDevice from './page/edit_device.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/device/:deviceId',
    element: <EditDevice/>
  },
  {
    path: '/login',
    element: <Login />
  }
])

function App () {
  return (
    <RouterProvider
      router={router}
      fallbackElement={'...Loading'}
      future={{ v7_startTransition: true }}
    />
  )
}

export default App
