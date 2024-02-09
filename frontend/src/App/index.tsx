import { Suspense, lazy } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ErrorBoundary from './ErrorBoundary.tsx'

import Loading from '../sections/components/Loading/index.tsx'
import { Layout } from '../sections/components/layout/index.tsx'
import { AppContextProvider } from '../sections/Context/AppContext.tsx'
import { apiRepository } from '../modules/shared/infraestructure/ApiRepository.ts'

const Home = lazy(async () => await import('../sections/home/index.tsx'))
const CreateDeviceForm = lazy(async () => await import('../sections/Device/device/CreateDeviceForm.tsx'))
const CreateBrandForm = lazy(async () => await import('../sections/Device/brand/CreateBrandForm.tsx'))
const CreateModelForm = lazy(async () => await import('../sections/Device/model/CreateModelForm.tsx'))
const CreateHardDriveForm = lazy(async () => await import('../sections/Device/features/hardDrive/CreateHardDriveForm.tsx'))
const Login = lazy(async () => await import('../sections/page/login/index.tsx'))
const NotFound = lazy(async () => await import('../sections/page/404/index.tsx'))

function App () {
  const repository = apiRepository
  return (
    <ErrorBoundary>
      <AppContextProvider repository={repository}>
        <Suspense fallback={<Loading />}>
            <BrowserRouter>
              <Layout>
                  <Routes>
                    <Route path='/' element={<Home />}/>
                    <Route path='/login' element={<Login />}/>
                    <Route path='/device/add' element={<CreateDeviceForm/>} />
                    <Route path='/device/edit/:id' element={<CreateDeviceForm/>} />
                    <Route path='/brand/add' element={<CreateBrandForm/>} />
                    <Route path='/brand/edit/:brandId' element={<CreateBrandForm/>} />
                    <Route path='/model/add' element={<CreateModelForm/>} />
                    <Route path='/model/edit/:modelId' element={<CreateModelForm/>} />
                    <Route path='/harddrive/add' element={<CreateHardDriveForm/>} />
                    <Route path='*' element={<NotFound/>} />
                  </Routes>
              </Layout>
            </BrowserRouter>
        </Suspense>
      </AppContextProvider>
    </ErrorBoundary>
  )
}

export default App
