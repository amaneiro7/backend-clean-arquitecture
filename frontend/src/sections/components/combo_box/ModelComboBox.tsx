import { lazy, useMemo, useState } from "react"
import { useAppContext } from "../../Context/AppProvider"
import { type Primitives } from "../../../modules/shared/domain/value-object/Primitives"
import { type BrandId } from "../../../modules/devices/brand/domain/BrandId"
import { type CategoryId } from "../../../modules/devices/category/domain/CategoryId"
import { type ModelApiresponse } from "../../../modules/shared/domain/types/responseTypes"
import { type ModelId } from "../../../modules/devices/model/model/domain/ModelId"
import { type DefaultModelProps, defaultInitialModelState } from "../../Hooks/model/ModelFormInitialState"
import { type OnHandleChange } from "../../../modules/shared/domain/types/types"
import { Operator } from "../../../modules/shared/domain/criteria/FilterOperators"

interface Props {
    value: Primitives<ModelId>
    name?: string
    categoryId: Primitives<CategoryId>
    brandId: Primitives<BrandId>
    onChange?: OnHandleChange
    handleModel?: ({value, memoryRamSlotQuantity, memoryRamType }: {value: string, memoryRamSlotQuantity?: number, memoryRamType?: string}) => void
    type?: 'form' | 'search'
    isAdd?: boolean
    error?: string
    isRequired?: boolean
    isDisabled?: boolean
}

interface NewValue extends ModelApiresponse {
    inputValue: string
}

const ComboBox = lazy(async () => import("./combo_box"))
const ModelDialog = lazy(async () => import("../Dialog/ModelDialog"))
const ReadOnlyInputBox = lazy(async () => import("../ReadOnlyInputBox").then(m => ({ default: m.ReadOnlyInputBox })))

export default function ModelComboBox({ value, error, isDisabled, isRequired, onChange, handleModel, categoryId, brandId, type = 'search', name = 'modelId', isAdd = false }: Props) {
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
      <>
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
                            const value = newValue ? newValue.id : ''
                            if (type === 'form') {
                                let memoryRamSlotQuantity
                                let memoryRamType
                                if (newValue?.modelComputer !== null) {
                                    memoryRamSlotQuantity = newValue ? newValue?.modelComputer.memoryRamSlotQuantity : undefined
                                    memoryRamType = newValue ? newValue?.modelComputer.memoryRamType.name : ''
                                    handleModel({ value, memoryRamSlotQuantity, memoryRamType })
                                }
                                if (newValue?.modelLaptop !== null) {
                                    memoryRamSlotQuantity = newValue ? newValue?.modelLaptop.memoryRamSlotQuantity : undefined
                                    memoryRamType = newValue ? newValue?.modelLaptop.memoryRamType.name : ''
                                }
                                handleModel({ value, memoryRamSlotQuantity, memoryRamType })
                            }
                            else {
                                onChange(name, value, Operator.EQUAL)
                            }
                        }
                    }}
                options={filterdModel}
                isDisabled={isDisabled}
                isRequired={isRequired}
                isError={!!error}
                errorMessage={error}
                loading={loading}
              />}
        {type === 'form' && (                    
          <ModelDialog
            dialogValue={dialogValue}
            open={open}
            toggleOpen={toggleOpen}
            createModel={createModel}
          />)}
      </>
    )
}