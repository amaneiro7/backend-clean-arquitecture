import { type FormEvent, lazy, Suspense, useEffect } from 'react'
import { useGenericFormData } from '../../Hooks/useGenericFormData'
import { useProcessorInitialState } from '../../Hooks/processor/ProcessorFormInitialState'
import { InputSkeletonLoading } from '../../components/skeleton/inputSkeletonLoading'
import { useProcessor } from '../../Hooks/processor/useProcessor'
import { useGenericForm, FormStatus } from '../../Hooks/useGenericForm'

const Main = lazy(async () => import('../../components/Main'))
const FormContainer = lazy(async () => import('../../components/formContainer'))
const ProcessorCollectionComboBox = lazy(async () => import('../../components/combo_box/ProductCollectionComboBox'))
const ProcessorNumberModelInput = lazy(async () => import('../../components/text-inputs/ProcessorNumberModelInput'))
const ProcessorCoresInput = lazy(async () => import('../../components/number-inputs/ProcessorCoresInput'))
const ProcessorFrequencyInput = lazy(async () => import('../../components/number-inputs/ProcessorFrequency'))
const ProcessorThreadsCheckbox = lazy(async () => import('../../components/checkbox/ProcessorThreadsCheckbox'))

export default function CreateProcessorForm() {
  const { createProcessor } = useProcessor()
  const { preloadedProcessorState } = useProcessorInitialState()
  const { formData, updateForm, resetForm } = useGenericFormData(preloadedProcessorState)
  const { formStatus, submitForm, resetFormStatus } = useGenericForm({ create: createProcessor })

  useEffect(() => {
    updateForm(preloadedProcessorState)

    return () => {
      resetForm()
    }
  }, [preloadedProcessorState])

  useEffect(() => {
    if (formStatus === FormStatus.Success) {
      resetFormStatus()
      resetForm()
      handleClose()
    }
    if (formStatus === FormStatus.Error) {
      resetFormStatus()
    }
  }, [formStatus])
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    event.stopPropagation()
    await submitForm(formData)
  }

  const handleClose = () => {
    window.history.back()
  }

  const handleChange = (name: string, value: string) => {
    updateForm({ [name]: value })
  }

  return (
    <Suspense>
      <Main content='max' overflow={false}>
        <Suspense>
          <FormContainer
            title='Agrega un nuevo Dispositivo'
            handleSubmit={handleSubmit}
            handleClose={handleClose}
            isDisabled={formStatus === FormStatus.Loading}
          >
            <Suspense fallback={<InputSkeletonLoading />}>
              <ProcessorCollectionComboBox
                onChange={handleChange}
                value={formData.productCollection}
                type="form"
              />
            </Suspense>
            <Suspense fallback={<InputSkeletonLoading />}>
              <ProcessorNumberModelInput
                onChange={handleChange}
                value={formData.numberModel}
                type="form"
              />
            </Suspense>

            <div className="flex gap-4">
              <Suspense fallback={<InputSkeletonLoading />}>
                <ProcessorCoresInput
                  onChange={handleChange}
                  value={formData.cores}
                  type="form"
                />
              </Suspense>


              <Suspense fallback={<InputSkeletonLoading />}>
                <ProcessorFrequencyInput
                  onChange={handleChange}
                  value={formData.frequency}
                  type="form"
                />
              </Suspense>

              <Suspense>
                <ProcessorThreadsCheckbox
                  onChange={handleChange}
                  value={formData.threads}
                />
              </Suspense>
            </div>
          </FormContainer>
        </Suspense>
      </Main>
    </Suspense>
  )
}
