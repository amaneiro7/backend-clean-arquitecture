import { Suspense, lazy } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ErrorBoundary from './ErrorBoundary.tsx'

import Loading from '../sections/components/Loading/index.tsx'
import { Layout } from '../sections/components/layout/index.tsx'
import { AppContextProvider } from '../sections/Context/AppContext.tsx'
import { apiRepository } from '../modules/shared/infraestructure/ApiRepository.ts'

const Home = lazy(async () => await import('../sections/home/index.tsx'))
const ComputerPage = lazy(async () => await import('../sections/Device/features/computer/ComputerTablePage.tsx'))
const CreateDeviceForm = lazy(async () => await import('../sections/Device/device/CreateDeviceForm.tsx'))
const CreateBrandForm = lazy(async () => await import('../sections/Device/brand/CreateBrandForm.tsx'))
const CreateModelForm = lazy(async () => await import('../sections/Device/model/CreateModelForm.tsx'))
const CreateProcessorForm = lazy(async () => await import('../sections/Device/features/processor/CreateProcessorForm.tsx'))
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
                    <Route path='/computer' element={<ComputerPage />}/>
                    <Route path='/login' element={<Login />}/>
                    <Route path='/device/add' element={<CreateDeviceForm/>} />
                    <Route path='/device/edit/:id' element={<CreateDeviceForm/>} />
                    <Route path='/brand/add' element={<CreateBrandForm/>} />
                    <Route path='/brand/edit/:id' element={<CreateBrandForm/>} />
                    <Route path='/model/add' element={<CreateModelForm/>} />
                    <Route path='/model/edit/:id' element={<CreateModelForm/>} />
                    <Route path='/processor/add' element={<CreateProcessorForm/>} />
                    <Route path='/processor/edit/:id' element={<CreateProcessorForm/>} />
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
