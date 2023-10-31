import { useState } from 'react'
import TextField from '../ui/text-field'
import Logo from '../ui/logo'
import { Copyright } from '../ui/copyright'
import { Checkbox } from '../ui/checkbox'
import { Link } from 'react-router-dom'
import { Button } from '../ui/button'

export default function Login () {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const handleSubmit = (event) => {
    event.preventDefault()
    const form = event.target
    const formData = new FormData(form)
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    form.reset()
  }

  return (
        <section className="bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center gap-2 px-6 py-8 mx-auto md:h-screen lg:py-0">
                <a href="#" >
                    <Logo />
                </a>
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Iniciar Sesión
                        </h1>
                        <form className="space-y-4 md:space-y-6" action="#">
                            <TextField
                                name="email"
                                label="Correo electrónico"
                                type="email"
                                placeholder=""
                                value={email}
                                handle={(e) => { setEmail(e.target.value) }}
                            />
                            <TextField
                                name="password"
                                label="Contraseña"
                                type="password"
                                placeholder=""
                                value={password}
                                handle={(e) => { setPassword(e.target.value) }}
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
                                text='Iniciar Sesión'
                                type='submit'
                                handle
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
