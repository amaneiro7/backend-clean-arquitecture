import { Suspense, lazy } from 'react'
import { BrowserRouter } from 'react-router-dom'
import ErrorBoundary from './ErrorBoundary.tsx'
import { AppContextProvider } from '../sections/Context/AppContext.tsx'
import { apiRepository } from '../modules/shared/infraestructure/ApiRepository.ts'
import Loading from '../sections/components/Loading/index.tsx'

const AppRoutes = lazy(async () => await import('../sections/Routes/index.tsx'))
const ToasterComponent = lazy(async () => import('../sections/utils/toaster.tsx').then(m => ({ default: m.ToasterComponent })))

function App() {
  const repository = apiRepository
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <AppContextProvider repository={repository}>
          <Suspense fallback={<Loading />}>
            <AppRoutes />
          </Suspense>          
          <ToasterComponent />          
        </AppContextProvider>
      </BrowserRouter>
    </ErrorBoundary>
  )
}

export default App
