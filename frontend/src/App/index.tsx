import { Suspense, lazy } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ErrorBoundary from './ErrorBoundary.tsx'

import Loading from '../components/Loading/index.tsx'
import { Layout } from '../components/layout.tsx'

const Home = lazy(async () => await import('../page/home.tsx'))
const AddNewDevice = lazy(async () => await import('../page/add_new_device'))
const EditDevice = lazy(async () => await import('../page/edit_device'))
const NotFound = lazy(async () => await import('../page/404'))

function App () {
  return (
    <ErrorBoundary>
      <Suspense fallback={<Loading />}>
          <BrowserRouter>
            <Layout>
                <Routes>
                  <Route path='/' element={<Home />}/>
                  <Route path='/device/:deviceId' element={<EditDevice/>} />
                  <Route path='/addnewdevice' element={<AddNewDevice/>} />
                  <Route path='*' element={<NotFound/>} />
                </Routes>
            </Layout>
          </BrowserRouter>
      </Suspense>
    </ErrorBoundary>
  )
}

export default App
