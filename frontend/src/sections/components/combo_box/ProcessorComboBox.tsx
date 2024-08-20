import { lazy, useMemo, useState } from "react"
import { useAppContext } from "../../Context/AppProvider"
import { defaultInitialProcessorState } from "../../Hooks/processor/ProcessorFormInitialState"
import { Operator } from "../../../modules/shared/domain/criteria/FilterOperators"
import { type ProcessorPrimitives } from "../../../modules/devices/fetures/processor/domain/Processor"
import { type ProcessorId } from "../../../modules/devices/fetures/processor/domain/ProcessorId"
import { type Primitives } from "../../../modules/shared/domain/value-object/Primitives"
import { type OnHandleChange } from "../../../modules/shared/domain/types/types"

interface Props {
    value?: Primitives<ProcessorId>
    onChange: OnHandleChange
    type?: 'form' | 'search'
}

interface NewValue extends ProcessorPrimitives {
    inputValue: string
}

const ComboBox = lazy(async () => import("./combo_box"))
const ProcessorDialog = lazy(async () => import("../Dialog/ProcessorDialog"))

export default function ProcessorComboBox({ value, onChange, type = 'search' }: Props) {
    const { useProcessor: { processors, createProcessor, loading } } = useAppContext()
    const [open, toggleOpen] = useState(false)
    const [dialogValue, setDialogValue] = useState<ProcessorPrimitives>(defaultInitialProcessorState)

    const initialValue = useMemo(() => {
        return processors.find(processor => processor.id === value)
    }, [processors, value])

    const processorOptions = useMemo(() => processors.map((processor) => ({
        id: processor.id,
        name: processor.name
    })), [processors])

    return (
      <>
        <ComboBox
          id='processorId'
          initialValue={initialValue}
          label='Procesador'
          name='processorId'
          type={type}
          onChange={(_, newValue: NewValue) => {
                    if (typeof newValue === 'string') {
                        // timeout to avoid instant validation of the dialog's form.
                        setTimeout(() => {
                            toggleOpen(true)
                            setDialogValue(prev => ({
                                ...prev,
                                numberModel: newValue
                            }))
                        })
                    } else if (newValue && newValue.inputValue) {
                        toggleOpen(true)
                        setDialogValue(prev => ({
                            ...prev,
                            numberModel: newValue.inputValue
                        }))
                    } else {
                        onChange('processorId', newValue ? newValue.id : '', Operator.EQUAL)
                    }
                }}
          options={processorOptions}
          isDisabled={false}
          isRequired={type === 'form'}
          loading={loading}
        >
          {type === 'form' && (            
            <ProcessorDialog
              dialogValue={dialogValue}
              open={open}
              toggleOpen={toggleOpen}
              createProcessor={createProcessor}
            />)}
        </ComboBox>
      </>
    )
}