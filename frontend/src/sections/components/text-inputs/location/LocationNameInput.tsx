import { lazy, Suspense, useLayoutEffect, useRef, useState } from 'react'
import { type Primitives } from '../../../../modules/shared/domain/value-object/Primitives'
import { type OnHandleChange } from '../../../../modules/shared/domain/types/types'
import { TypeOfSiteId } from '../../../../modules/location/typeofsites/domain/typeOfSiteId'
import { Operator } from '../../../../modules/shared/domain/criteria/FilterOperators'
import { LocationName } from '../../../../modules/location/locations/domain/LocationName'
import { InputSkeletonLoading } from '../../skeleton/inputSkeletonLoading'


interface Props {
    value: Primitives<LocationName>
    onChange: OnHandleChange
    siteName?: string
    typeOfSite?: Primitives<TypeOfSiteId>
    isAddForm?: boolean
    type?: 'form' | 'search' | 'dialog'
}

const FormInput = lazy(async () => import('./../FormInput').then(m => ({ default: m.FormInput })))
const ReadOnlyInputBox = lazy(async () => import('../../ReadOnlyInputBox').then(m => ({ default: m.ReadOnlyInputBox })))
const CodeAgencyInput = lazy(async () => import('../../number-inputs/CodeAgency').then(m => ({ default: m.CodeAgencyInput })))

export function LocationNameInput({ value = '', onChange, type = 'form', siteName, typeOfSite, isAddForm }: Props) {
    const [errorMessage, setErrorMessage] = useState('')
    const [isError, setIsError] = useState(false)
    const isFirstInput = useRef(true)
    const [codeAgency, setCodeAgency] = useState(1)

    useLayoutEffect(() => {
        if (type !== 'form') return

        if (isFirstInput.current || !value) {
            isFirstInput.current = value.length !== LocationName.NAME_MIN_LENGTH
            return
        }

        const isValid = LocationName.isValid(value)

        setIsError(!isValid)
        setErrorMessage(isValid ? '' : LocationName.invalidMessage())

        return () => {
            setErrorMessage('')
            setIsError(false)
        }
    }, [value])
    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        let { name, value } = event.target
        value = value.trim().toUpperCase()
        onChange(name, value, Operator.CONTAINS)
    }

    useLayoutEffect(() => {
        if (type !== 'form') return
        if (typeOfSite !== TypeOfSiteId.SitesOptions.AGENCY) {            
            onChange('name', '')
            return
        }
        if (typeOfSite === TypeOfSiteId.SitesOptions.AGENCY) {
            const name = `Agencia (${codeAgency}) ${siteName}`            
            onChange('name', name)
        }
    }, [siteName, typeOfSite])

    return (
        <>
            {
                (isAddForm && typeOfSite === TypeOfSiteId.SitesOptions.AGENCY) &&
                <Suspense>
                    <CodeAgencyInput
                        onChange={(_, value) => {
                            let numero = Number(value)
                            let numberFormater: string = ''
                            setCodeAgency(numero)
                            if (numero >= 1 && numero <= 9) {
                                numberFormater = numero.toString().padStart(2, '0')
                            } else if (numero >= 10 && numero <= 99) {
                                numberFormater = numero.toString().padStart(3, '0')
                            } else {
                                numberFormater = numero.toString()
                            }

                            const name = `Agencia (${numberFormater}) ${siteName}`
                            onChange('name', name)
                        }}
                        value={codeAgency}
                    />
                </Suspense>
            }
            <Suspense fallback={<InputSkeletonLoading />}>
                {
                    ((!isAddForm && type === 'form') || (TypeOfSiteId.SitesOptions.AGENCY === typeOfSite && type === 'form'))
                        ? <ReadOnlyInputBox label='Nombre del sitio' required value={value} />
                        : <FormInput
                            id='name'
                            isRequired={type !== 'search'}
                            name="name"
                            type="text"
                            label='Nombre del sitio'
                            placeholder='-- Ingrese el nombre del sitio --'
                            handle={handleChange}
                            value={value}
                            isError={isError}
                            errorMessage={errorMessage}
                        />
                }
            </Suspense>
        </>
    )
}
