import { lazy, Suspense, useEffect } from 'react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { useAppContext } from '../../Context/AppContext'
import { FormStatus, useLoginForm } from './useLoginForm'
import { useGenericFormData } from '../../Hooks/useGenericFormData'
import { ToasterComponent } from '../../utils/toaster'
import { InputSkeletonLoading } from '../../components/Loading/inputSkeletonLoading'

const initialState = {
  email: '',
  password: ''
}

const Logo = lazy(async () => await import ('../../ui/Logo'))
const EmailInput = lazy(async () => await import ('./EmailInput'))
const PasswordInput = lazy(async () => await import ('./PasswordInput'))
const PageTitle = lazy(async () => await import ('../../components/PageTitle'))
const Button = lazy(async () => await import('../../ui/button'))
const Copyright = lazy(async () => await import ('../../ui/copyright').then(m => ({ default: m.Copyright })))
const Checkbox = lazy(async () => await import ('../../ui/checkbox').then(m => ({ default: m.Checkbox })))


export default function Login () {
  const { formData, updateForm, resetForm } = useGenericFormData(initialState)
  const { formStatus, resetFormStatus, submitForm } = useLoginForm()
  const navigate = useNavigate()
  const location = useLocation()
  const { useAuth: { user } } = useAppContext()

  const from = location.state?.from?.pathname ?? '/'

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    const { email, password } = formData
    await submitForm({ email, password })
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
  }, [formStatus])

  if (user !== null) {
    return <Navigate to={from} />
  }

  return (
        <section className="bg-gray-50 dark:bg-gray-900">
          <ToasterComponent />
            <div className="flex flex-col items-center justify-center gap-2 px-6 py-8 mx-auto md:h-screen lg:py-0">
                <a href="#" >
                    <Logo />
                </a>
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                      <Suspense fallback={<InputSkeletonLoading />}>
                        <PageTitle title='Iniciar Sesión'/>
                      </Suspense>
                        <form className="space-y-4 md:space-y-6" action="submit" onSubmit={handleSubmit}>
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
                            <div className="flex items-center justify-between">
                                <Checkbox
                                    label='remember'
                                    text='Recuerdáme'
                                />
                                <Link to="#" className="text-sm font-medium text-secondary hover:underline dark:text-primary-500" >
                                        ¿Olvidaste tu contraseña?
                                </Link>
                            </div>
                            <Suspense>
                              <Button
                                  actionType='ACTION'
                                  text='Iniciar Sesión'
                                  type='submit'
                              />
                            </Suspense>
                            {/* <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Don’t have an account yet? <a href="#" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</a>
                            </p> */}
                        </form>
                    </div>
                </div>
                <Suspense>
                  <Copyright />
                </Suspense>
            </div>
        </section>
  )
}
