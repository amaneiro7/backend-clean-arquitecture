import { Suspense } from 'react'
import { BrowserRouter, RouterProvider } from 'react-router-dom'
import ErrorBoundary from './ErrorBoundary.tsx'

import Loading from '../sections/components/Loading/index.tsx'
import { Layout } from '../sections/components/layout/index.tsx'
import { AppContextProvider } from '../sections/Context/AppContext.tsx'
import { apiRepository } from '../modules/shared/infraestructure/ApiRepository.ts'
import { AppRoutes } from '../sections/Routes/index.tsx'
function App () {
  const repository = apiRepository
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <AppContextProvider repository={repository}>
          <Suspense fallback={<Loading />}>
              <Layout>
                <AppRoutes />
              </Layout>
          </Suspense>
        </AppContextProvider>
      </BrowserRouter>
    </ErrorBoundary>
  )
}

export default App
