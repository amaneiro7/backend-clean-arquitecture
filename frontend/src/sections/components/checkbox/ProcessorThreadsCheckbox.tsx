import { Suspense } from "react";
import { Checkbox } from ".";
import { OnHandleChange } from "../../../modules/shared/domain/types/types";
import { ProcessorHasThreads } from "../../../modules/devices/fetures/processor/domain/ProcessorHasThreads";
import { Primitives } from "../../../modules/shared/domain/value-object/Primitives";
interface Props {
    value: Primitives<ProcessorHasThreads>
    onChange: OnHandleChange
   
  }
export default function ProcessorThreadsCheckbox ({value, onChange}: Props) {
    return (
        <Suspense>
            <Checkbox 
                label="Tiene Threads"
                text="¿Tiene Threads?"
                name="threads"
                value={value}
                handle={(event) =>{
                    const {name, checked} = event.target
                    onChange(name, checked);
                }}
            />
        </Suspense>
    )
}