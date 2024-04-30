import { lazy, Suspense, useEffect, useMemo, useRef, useState } from "react"
import { OnHandleChange } from "../../../modules/shared/domain/types/types"
import { Primitives } from "../../../modules/shared/domain/value-object/Primitives"
import { useAppContext } from "../../Context/AppContext"
import { useProcessor } from "../../Device/features/processor/useProcessor"
import { ProcessorProductCollection } from "../../../modules/devices/fetures/processor/domain/ProcessorCollection"
import { InputSkeletonLoading } from "../skeleton/inputSkeletonLoading"


interface Props {
    value?: Primitives<ProcessorProductCollection>
    onChange: OnHandleChange
    type?: 'form' | 'search'
}

const ComboBox = lazy(async() => import("./combo_box"))

export default function ProcessorCollectionComboBox({ value, onChange, type = 'search' }: Props) {
    const { repository } = useAppContext()
    const { processors, loading } = useProcessor(repository)
    
    const [errorMessage, setErrorMessage] = useState('')
    const [isError, setIsError] = useState(false)
    const isFirstInput = useRef(true)
    
    const processorOptions: {id: string, name: string}[] = useMemo(() => {
        const productCollectionList: Set<string> = new Set()
        processors.forEach(processor => {
            productCollectionList.add(processor.productCollection)
        })
        return Array.from(productCollectionList).map(product => ({id: product, name: product}))
    }, [processors])

    const initialValue = useMemo(() => {
        return processorOptions.find(category => category.name === value)
    }, [processorOptions, value])

    useEffect(() => {
        if (isFirstInput.current) {
            isFirstInput.current = value === ''
            return
          }
    
        const isValid = ProcessorProductCollection.isValid(value)       
        
        setIsError(!isValid)
        setErrorMessage(isValid ? '' : ProcessorProductCollection.invalidMessage(value))
        
        return () => {
          setErrorMessage('')
          setIsError(false)
        }
      }, [value])


    return (
        <Suspense fallback={<InputSkeletonLoading />}>
            <ComboBox
                id='productCollection'
                initialValue={initialValue}
                label="Collección de Productos"
                name='productCollection'
                freeSolo
                type='search'
                onChange={(_, newValue) => {
                    onChange('productCollection', newValue ? newValue.name : '')
                    
                }}
                options={processorOptions}
                isRequired={type === 'form'}
                isDisabled={false}
                loading={loading}
                isError={isError}
                errorMessage={errorMessage}
            >
            </ComboBox>
        </Suspense>
    )
}