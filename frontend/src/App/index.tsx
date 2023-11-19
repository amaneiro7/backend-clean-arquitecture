import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { Layout } from '../components/layout.tsx'
import ErrorBoundary from './ErrorBoundary.tsx'
import Loading from '../components/Loading/index.tsx'
import { Suspense, lazy } from 'react'
import EditDevice from '../page/edit_device.tsx'

const Home = lazy(async () => await import('../page/home.tsx'))

function App () {
  return (
    <ErrorBoundary>
      <Suspense fallback={<Loading />}>
          <BrowserRouter>
            <Layout>
                <Routes>
                  <Route path='/' element={<Home />}/>
                  <Route path='/device/:deviceId' element={<EditDevice/>} />
                </Routes>
            </Layout>
          </BrowserRouter>
      </Suspense>
    </ErrorBoundary>
  )
}

export default App
