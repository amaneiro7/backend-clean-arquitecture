import { lazy, Suspense, useEffect } from 'react'
import { Link, NavigateFunction, useLocation } from 'react-router-dom'
import { useGenericFormData } from '../../Hooks/useGenericFormData'
import { FormStatus, useGenericForm } from '../../Hooks/useGenericForm'
import { useAppContext } from '../../Context/AppContext'
import { InputSkeletonLoading } from '../../components/skeleton/inputSkeletonLoading'

const Logo = lazy(async () => await import('../../components/Logo'))
const EmailInput = lazy(async () => await import('./EmailInput').then(m => ({ default: m.EmailInput })))
const PasswordInput = lazy(async () => await import('./PasswordInput').then(m => ({ default: m.PasswordInput })))
const PageTitle = lazy(async () => await import('../../components/PageTitle'))
const Button = lazy(async () => await import('../../components/button'))
const Copyright = lazy(async () => await import('../../components/Copyright').then(m => ({ default: m.Copyright })))

export function FormLogin ({ navigate }: { navigate: NavigateFunction }) {
    const { useAuth: { getLogin } } = useAppContext()
    const { formData, updateForm, resetForm } = useGenericFormData({
      email: '',
      password: ''
    })
    const { formStatus, resetFormStatus, submitForm } = useGenericForm({ create: getLogin })
    const location = useLocation()
  
    const from = location.state?.from?.pathname ?? '/'
    const handleSubmit = async (event: React.FormEvent) => {
      event.preventDefault()
      await submitForm(formData)
    }
  
    const handleChange = (ev: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      updateForm({ [ev.target.name]: ev.target.value })
    }
   
  
    useEffect(() => {
      if (formStatus === FormStatus.Success) {
        resetFormStatus()
        resetForm()
        navigate(from, { replace: true })
      }
      if (formStatus === FormStatus.Error) {
        resetFormStatus()
      }
    }, [formStatus, from, navigate, resetForm, resetFormStatus])
    return (
      <main className='bg-gray-300 dark:bg-gray-900'>      
        <section className='flex flex-col items-center justify-center gap-2 px-6 py-8 mx-auto md:h-screen lg:py-0'>
          <div className='w-full flex flex-col gap-4 md:gap-6 p-6 sm:p-8 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700'>
            
            <Link className='mx-auto' aria-label='Logo' aria-describedby='Logo y un enlace al inicio de la página' to='/'>          
              <Logo />          
            </Link>
              
            <PageTitle title='Iniciar Sesión' />
              
            <form className='space-y-4 md:space-y-6' action='submit' onSubmit={handleSubmit}>
              <Suspense fallback={<InputSkeletonLoading />}>
                <EmailInput
                  onChange={handleChange}
                  value={formData.email}
                />
              </Suspense>
              <Suspense fallback={<InputSkeletonLoading />}>
                <PasswordInput
                  onChange={handleChange}
                  value={formData.password}
                />
              </Suspense>
                
              <Button                                
                actionType='CLOSE'
                size='full'
                text='Entrar'
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
  