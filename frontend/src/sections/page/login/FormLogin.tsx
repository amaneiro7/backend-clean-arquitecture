import { lazy, Suspense } from 'react'
import { Link, NavigateFunction } from 'react-router-dom'

import { InputSkeletonLoading } from '../../components/skeleton/inputSkeletonLoading'
import { useLogin } from './useLogin'

const Logo = lazy(async () => await import('../../components/Logo'))
const Input = lazy(async () => import('../../components/text-inputs/Input').then(m => ({ default: m.Input })))
const PageTitle = lazy(async () => await import('../../components/PageTitle'))
const Button = lazy(async () => await import('../../components/button'))
const Copyright = lazy(async () => await import('../../components/Copyright').then(m => ({ default: m.Copyright })))

export function FormLogin ({ navigate }: { navigate: NavigateFunction }) {
    const { formData, errors, loading, valid, handleChange, handleSubmit } = useLogin({navigate})
    return (
      <main className='bg-gray-300 dark:bg-gray-900'>      
        <section className='flex flex-col items-center justify-center gap-2 px-6 py-8 mx-auto md:h-screen lg:py-0'>
          <div className='w-full flex flex-col gap-4 md:gap-6 p-6 sm:p-8 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700'>
            
            <Link className='mx-auto' aria-label='Logo' aria-describedby='Logo y un enlace al inicio de la página' to='/'>          
              <Logo />          
            </Link>
              
            <PageTitle title='Iniciar Sesión' />
              
            <form id='login' action='submit' onSubmit={handleSubmit}>
              <div className='space-y-6 md:space-y-8 mb-20'>
                <Suspense fallback={<InputSkeletonLoading />}>                  
                  <Input
                    label='Correo Electrónico'
                    type='email'
                    name='email'
                    onChange={handleChange}
                    value={formData.email}
                    errorMessage={errors.email}
                    error={errors.email ? true : false}
                    valid={valid.email}
                    isRequired
                  />
                </Suspense>
                <Suspense fallback={<InputSkeletonLoading />}>
                  <Input
                    label='Contraseña'
                    type='password'
                    name='password'
                    onChange={handleChange}
                    value={formData.password}
                    errorMessage={errors.password}
                    error={errors.password ? true : false}
                    valid={valid.password}
                    isRequired
                  />
                </Suspense>

              </div>
                
              <Button
                actionType='CLOSE'
                size='full'
                disabled={loading}
                text={loading ? 'Cargando...' : 'Ingresar'}
                type='submit'
              />
                
            </form>
          </div>
          <footer>
            <Copyright />
          </footer>
        </section>      
      </main>
    )
  }
  