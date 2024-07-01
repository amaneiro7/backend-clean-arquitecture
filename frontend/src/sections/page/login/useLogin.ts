import { useEffect, useRef, useState } from "react"
import { NavigateFunction, useLocation } from "react-router-dom"
import { useAppContext } from "../../Context/AppContext"
import { FormStatus, useGenericForm } from "../../Hooks/useGenericForm"
import { useGenericFormData } from "../../Hooks/useGenericFormData"
import { UserEmail } from "../../../modules/user/user/domain/UserEmail"
import { UserPassword } from "../../../modules/user/user/domain/UserPassword"

const initialState: InitialState = {
    email: '',
    password: ''
}

interface InitialState {
    email: string
    password: string
}

export function useLogin({ navigate }: { navigate: NavigateFunction }): {
    handleSubmit: (event: React.FormEvent) => Promise<void>
    handleChange: (ev: React.ChangeEvent<HTMLInputElement>) => void
    errors: InitialState
    loading: boolean
    formData: InitialState
    valid: { email: boolean; password: boolean }
} {
    const location = useLocation()
    const [errors, setErrors] = useState(initialState)
    const [valid, setValid] = useState({ email: false, password: false })
    const isPasswordFirstInput = useRef(true)
    const isEmailFirstInput = useRef(true)
    const { useAuth: { getLogin, loading } } = useAppContext()
    const { formData, updateForm, resetForm } = useGenericFormData(initialState)
    const { formStatus, resetFormStatus, submitForm } = useGenericForm({ create: getLogin })

    const from = location.state?.from?.pathname ?? '/'

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault()
        await submitForm(formData)
    }

    const handleChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
        updateForm({ [ev.target.name]: ev.target.value })
    }

    useEffect(() => {
        if (isEmailFirstInput.current || formData.email === '') {
            isEmailFirstInput.current = !formData.email.includes('@')
        }

        if (isPasswordFirstInput.current || formData.password === '') {
            isPasswordFirstInput.current = formData.password?.length <= UserPassword.HAS_MIN_LENGTH
        }

        const isEmailValid = isEmailFirstInput.current ? true : UserEmail.isValid(formData.email)
        const isPasswordValid = isPasswordFirstInput.current ? true : UserPassword.isValid(formData.password)

        setValid({
            email: UserEmail.isValid(formData.email),
            password: UserPassword.isValid(formData.password),
        })

        setErrors({
            email: isEmailValid ? '' : UserEmail.invalidMessage(formData.email),
            password: isPasswordValid ? '' : UserPassword.invalidMessage()
        })
    }, [formData])


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

    return {
        handleSubmit,
        handleChange,
        errors,
        loading,
        valid,
        formData
    }
}