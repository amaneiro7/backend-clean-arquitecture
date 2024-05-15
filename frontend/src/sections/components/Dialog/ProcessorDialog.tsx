import { lazy, Suspense, useEffect } from "react";
import { useGenericFormData } from "../../Hooks/useGenericFormData"
import { InputSkeletonLoading } from "../skeleton/inputSkeletonLoading"
import { ProcessorPrimitives } from "../../../modules/devices/fetures/processor/domain/Processor"
import { FormStatus, useGenericForm } from "../../Hooks/useGenericForm";


interface Props {
    dialogValue: ProcessorPrimitives
    open: boolean,
    toggleOpen: React.Dispatch<React.SetStateAction<boolean>>
    createProcessor: (formData: ProcessorPrimitives) => Promise<void> 
}

const DialogAdd = lazy(async () => import("./dialog"))
const ProcessorNumberModelInput = lazy(async () => import("../text-inputs/ProcessorNumberModelInput"))
const ProcessorCoresInput = lazy(async () => import("../number-inputs/ProcessorCoresInput"))
const ProcessorFrequencyInput = lazy(async () => import("../number-inputs/ProcessorFrequency"))
const ProcessorThreadsCheckbox = lazy(async () => import("../checkbox/ProcessorThreadsCheckbox"))
const ProcessorCollectionComboBox = lazy(async () => import("../combo_box/ProductCollectionComboBox"))

export default function ProcessorDialog({ dialogValue, open, toggleOpen, createProcessor }: Props) {
    const { formData, resetForm, updateForm } = useGenericFormData(dialogValue)
    const { formStatus, resetFormStatus, submitForm } = useGenericForm({create: createProcessor})

    useEffect(() => {
        updateForm(dialogValue)
        return () => {
            resetForm()
        }
    }, [dialogValue])

    useEffect(() => {
        if (formStatus === FormStatus.Success) {
            resetFormStatus()
            resetForm()
            toggleOpen(false)
        }
        if (formStatus === FormStatus.Error) {
            resetFormStatus()
        }
    }, [formStatus])

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault()
        event.stopPropagation()
        await submitForm(formData)
    }

    const handleChange = (name: string, value: string) => {
        updateForm({ [name]: value })
    }

    return (
        <DialogAdd
            title="Agregar una nuevo procesador"
            contextText="¿No existe el procesador en la lista? Por favor, añada uno nuevo."
            open={open}
            toggleOpen={toggleOpen}
            handleSubmit={handleSubmit}
            resetForm={resetForm}
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

        </DialogAdd>
    )
}