import { Suspense, lazy } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ErrorBoundary from './ErrorBoundary.tsx'

import Loading from '../sections/components/Loading/index.tsx'
import { Layout } from '../sections/components/layout/index.tsx'
import { InventarioContextProvider } from '../sections/Context/InventarioContext.tsx'
import { apiRepository } from '../modules/shared/infraestructure/ApiRepository.ts'

const Home = lazy(async () => await import('../sections/page/home/index.tsx'))
const Login = lazy(async () => await import('../sections/page/login/index.tsx'))
const DeviceForm = lazy(async () => await import('../sections/page/DeviceForm/index.tsx'))
const BrandForm = lazy(async () => await import('../sections/page/BrandForm/index.tsx'))
const ModelForm = lazy(async () => await import('../sections/page/ModelForm/index.tsx'))
const NotFound = lazy(async () => await import('../sections/page/404/index.tsx'))

function App () {
  const repository = apiRepository
  return (
    <ErrorBoundary>
      <InventarioContextProvider repository={repository}>
        <Suspense fallback={<Loading />}>
            <BrowserRouter>
              <Layout>
                  <Routes>
                    <Route path='/' element={<Home />}/>
                    <Route path='/login' element={<Login />}/>
                    <Route path='/device/add' element={<DeviceForm/>} />
                    <Route path='/device/edit/:deviceId' element={<DeviceForm/>} />
                    <Route path='/brand/add' element={<BrandForm/>} />
                    <Route path='/brand/edit/:brandId' element={<BrandForm/>} />
                    <Route path='/model/add' element={<ModelForm/>} />
                    <Route path='/model/edit/:modelId' element={<ModelForm/>} />
                    <Route path='*' element={<NotFound/>} />
                  </Routes>
              </Layout>
            </BrowserRouter>
        </Suspense>
      </InventarioContextProvider>
    </ErrorBoundary>
  )
}

export default App
