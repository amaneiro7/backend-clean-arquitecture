import { Suspense, lazy } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ErrorBoundary from './ErrorBoundary.tsx'

import Loading from '../components/Loading/index.tsx'
import { Layout } from '../components/layout/index.tsx'

const Home = lazy(async () => await import('../page/home/index.tsx'))
const DeviceForm = lazy(async () => await import('../page/DeviceForm/index.tsx'))
const BrandForm = lazy(async () => await import('../page/BrandForm/index.tsx'))
const NotFound = lazy(async () => await import('../page/404'))

function App () {
  return (
    <ErrorBoundary>
      <Suspense fallback={<Loading />}>
          <BrowserRouter>
            <Layout>
                <Routes>
                  <Route path='/' element={<Home />}/>
                  <Route path='/device/add' element={<DeviceForm/>} />
                  <Route path='/device/edit/:deviceId' element={<DeviceForm/>} />
                  <Route path='/brand/add' element={<BrandForm/>} />
                  <Route path='/brand/edit/:brandId' element={<BrandForm/>} />
                  <Route path='*' element={<NotFound/>} />
                </Routes>
            </Layout>
          </BrowserRouter>
      </Suspense>
    </ErrorBoundary>
  )
}

export default App
