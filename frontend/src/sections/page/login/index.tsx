import { lazy, useEffect } from 'react'
import { Copyright } from '../../ui/copyright'
import { Checkbox } from '../../ui/checkbox'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import Logo from '../../ui/Logo'
import { useGenericFormData } from '../../Hooks/useGenericFormData'
import { FormStatus, useLoginForm } from './useLoginForm'
import EmailInput from './EmailInput'
import PasswordInput from './PasswordInput'
import { useAppContext } from '../../Context/AppContext'
import { ToasterComponent } from '../../utils/toaster'

const initialState = {
  email: '',
  password: ''
}

const Button = lazy(async () => await import('../../ui/button'))

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
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Iniciar Sesión
                        </h1>
                        <form className="space-y-4 md:space-y-6" action="submit" onSubmit={(event) => { void handleSubmit(event) }}>
                            <EmailInput
                                onChange={handleChange}
                                value={formData.email}
                            />
                            <PasswordInput
                                onChange={handleChange}
                                value={formData.password}
                            />
                            <div className="flex items-center justify-between">
                                <Checkbox
                                    label='remember'
                                    text='Recuerdáme'
                                />
                                <Link to="#" className="text-sm font-medium text-secondary hover:underline dark:text-primary-500" >
                                        ¿Olvidaste tu contraseña?
                                </Link>
                            </div>
                            <Button
                                actionType='ACTION'
                                text='Iniciar Sesión'
                                type='submit'
                            />
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Don’t have an account yet? <a href="#" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</a>
                            </p>
                        </form>
                    </div>
                </div>
                <Copyright />
            </div>
        </section>
  )
}
