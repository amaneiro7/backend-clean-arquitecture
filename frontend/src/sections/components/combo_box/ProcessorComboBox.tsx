import { lazy, Suspense, useMemo, useState } from "react";
import { OnHandleChange } from "../../../modules/shared/domain/types/types";
import { Primitives } from "../../../modules/shared/domain/value-object/Primitives";
import { Operator } from "../../../modules/shared/domain/criteria/FilterOperators";
import { InputSkeletonLoading } from "../skeleton/inputSkeletonLoading";
import { ProcessorId } from "../../../modules/devices/fetures/processor/domain/ProcessorId";
import { useProcessor } from "../../Hooks/processor/useProcessor";
import { ProcessorPrimitives } from "../../../modules/devices/fetures/processor/domain/Processor";

interface Props {
    value?: Primitives<ProcessorId>
    onChange: OnHandleChange
    type?: 'form' | 'search'
}

const ComboBox = lazy(async () => import("./combo_box"));
const ProcessorDialog = lazy(async () => import("../Dialog/ProcessorDialog"));

export default function ProcessorComboBox({ value, onChange, type = 'search' }: Props) {
    const { processors, loading } = useProcessor()
    const [open, toggleOpen] = useState(false)
    const [dialogValue, setDialogValue] = useState<ProcessorPrimitives>({
        productCollection: '',
        numberModel: '',
        cores: 1,
        frequency: 1,
        threads: false
    });

    const initialValue = useMemo(() => {
        return processors.find(processor => processor.id === value)
    }, [processors, value])

    const processorOptions = useMemo(() => processors.map((processor) => ({
        id: processor.id,
        name: processor.name
    })), [processors])

    return (
        <Suspense fallback={<InputSkeletonLoading />}>
            <ComboBox
                id='processorId'
                initialValue={initialValue}
                label="Procesador"
                name='processorId'
                type={type}
                onChange={(_, newValue) => {
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
                        toggleOpen(true);
                        setDialogValue(prev => ({
                            ...prev,
                            numberModel: newValue.inputValue
                        }));
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
                    <Suspense>
                        <ProcessorDialog dialogValue={dialogValue} open={open} toggleOpen={toggleOpen} />
                    </Suspense>
                )}
            </ComboBox>
        </Suspense>
    )
}