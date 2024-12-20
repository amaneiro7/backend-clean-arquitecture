import { Suspense, lazy } from 'react'
import { BrowserRouter } from 'react-router-dom'
import ErrorBoundary from './ErrorBoundary.tsx'
import { AuthContextProvider } from '@/sections/Context/AuthContext.tsx'
import { apiRepository } from '../modules/shared/infraestructure/ApiRepository.ts'
import Loading from '../sections/components/Loading/index.tsx'

const AppRoutes = lazy(async () => await import('../sections/Routes/routes.tsx'))
const ToasterComponent = lazy(async () => import('../sections/utils/toaster.tsx').then(m => ({ default: m.ToasterComponent })))

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <ErrorBoundary>
        <BrowserRouter
          future={{
            v7_startTransition: true,
            v7_relativeSplatPath: true,
          }}
        >
          <AuthContextProvider repository={apiRepository}>
            <Suspense>
              <AppRoutes />
              <ToasterComponent />
            </Suspense>
          </AuthContextProvider>
        </BrowserRouter>
      </ErrorBoundary>
    </Suspense>
  )
}

export default App
