import { lazy, Suspense, useMemo, useState } from "react"
import { OnHandleChange } from "../../../modules/shared/domain/types/types"
import { Primitives } from "../../../modules/shared/domain/value-object/Primitives"
import { Operator } from "../../../modules/shared/domain/criteria/FilterOperators"
import { BrandId } from "../../../modules/devices/brand/domain/BrandId"
import { CategoryId } from "../../../modules/devices/category/domain/CategoryId"
import { ModelApiresponse } from "../../../modules/shared/domain/types/responseTypes"
import { ModelId } from "../../../modules/devices/model/model/domain/ModelId"
import { InputSkeletonLoading } from "../skeleton/inputSkeletonLoading"
import { DefaultModelProps, defaultInitialModelState } from "../../Hooks/model/ModelFormInitialState"
import { useAppContext } from "../../Context/AppProvider"

interface Props {
    value: Primitives<ModelId>
    name?: string
    categoryId: Primitives<CategoryId>
    brandId: Primitives<BrandId>
    onChange: OnHandleChange
    type?: 'form' | 'search'
    isAdd?: boolean
}

interface NewValue extends ModelApiresponse {
    inputValue: string
}

const ComboBox = lazy(async () => import("./combo_box"))
const ModelDialog = lazy(async () => import("../Dialog/ModelDialog"))
const ReadOnlyInputBox = lazy(async () => import("../ReadOnlyInputBox").then(m => ({ default: m.ReadOnlyInputBox })))

export default function ModelComboBox({ value, onChange, categoryId, brandId, type = 'search', name = 'modelId', isAdd = false }: Props) {
    const { useModel: { models, loading, createModel } } = useAppContext()
    const [open, toggleOpen] = useState(false)
    const [dialogValue, setDialogValue] = useState<DefaultModelProps>(defaultInitialModelState)

    
    const filterdModel = useMemo(() => {
        return (models as unknown as ModelApiresponse[]).filter(model => {
            const category = model.categoryId === categoryId || !categoryId
            const brand = model.brandId === brandId || !brandId
            return category && brand
        })
    }, [models, categoryId, brandId])
    
    const initialValue = useMemo(() => {
        return filterdModel.find(model => model.id === value)
    }, [filterdModel, value])

    return (
      <Suspense fallback={<InputSkeletonLoading />}>
        {(!isAdd && type === 'form') 
            ? <ReadOnlyInputBox label='Modelo' defaultValue={initialValue?.name} />
            : <ComboBox
                id='modelId'
                initialValue={initialValue}
                label='Modelo'
                name={name}
                readOnly={!isAdd && type === 'form'}
                type={type}
                onChange={(_, newValue: NewValue) => {
                        if (typeof newValue === 'string') {
                            // timeout to avoid instant validation of the dialog's form.
                            setTimeout(() => {
                                toggleOpen(true)
                                setDialogValue(prev => ({ ...prev, value: newValue }))
                            })
                        } else if (newValue && newValue.inputValue) {
                            toggleOpen(true)
                            setDialogValue(prev => ({ ...prev, name: newValue.inputValue }))
                        } else {
                            onChange(name, newValue ? newValue.id : '', Operator.EQUAL)
                            if (type === 'form') {
                                if (newValue?.modelComputer !== null) {
                                    onChange('memoryRamSlotQuantity', newValue ? newValue?.modelComputer.memoryRamSlotQuantity : undefined)
                                    onChange('memoryRamType', newValue ? newValue?.modelComputer.memoryRamType.name : '')
                                }
                                if (newValue?.modelLaptop !== null) {
                                    onChange('memoryRamSlotQuantity', newValue ? newValue?.modelComputer.memoryRamSlotQuantity : undefined)
                                    onChange('memoryRamType', newValue ? newValue?.modelComputer.memoryRamType.name : '')
                                }
                            }
                        }
                    }}
                options={filterdModel}
                isDisabled={false}
                isRequired={type === 'form'}
                loading={loading}
              />}
        {type === 'form' && (                    
          <ModelDialog
            dialogValue={dialogValue}
            open={open}
            toggleOpen={toggleOpen}
            createModel={createModel}
          />)}
      </Suspense>
    )
}