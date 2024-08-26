import { lazy, useMemo, useState } from "react"
import { useAppContext } from "../../Context/AppProvider"
import { type OnHandleChange } from "../../../modules/shared/domain/types/types"
import { type Primitives } from "../../../modules/shared/domain/value-object/Primitives"
import { type BrandId } from "../../../modules/devices/brand/domain/BrandId"
import { type CategoryId } from "../../../modules/devices/category/domain/CategoryId"
import { type BrandPrimitives } from "../../../modules/devices/brand/domain/Brand"
import { type BrandApiResponse } from "../../../modules/shared/domain/types/responseTypes"
import { Operator } from "../../../modules/shared/domain/criteria/FilterOperators"
import { defaultInitialBrandState } from "../../Hooks/brand/BrandFormInitialState"

interface Props {
    value?: Primitives<BrandId>
    categoryId?: Primitives<CategoryId>
    onChange: OnHandleChange
    type?: 'form' | 'search'
    isAdd?: boolean
    error?: string
    isRequired?: boolean
    isDisabled?: boolean
}

interface NewValue extends BrandPrimitives {
    inputValue: string
}

const ComboBox = lazy(async () => import("./combo_box"))
const BrandDialog = lazy(async () => import("../Dialog/BrandDialog").then(m => ({ default: m.BrandDialog })))
const ReadOnlyInputBox = lazy(async () => import("../ReadOnlyInputBox").then(m => ({ default: m.ReadOnlyInputBox })))

export default function BrandComboBox({ value, onChange, error, isDisabled, isRequired, categoryId, type = 'search', isAdd = false }: Props) {
    const { useBrand: { brands, loading, createBrand } } = useAppContext()
    const [open, toggleOpen] = useState(false)
    const [dialogValue, setDialogValue] = useState<BrandPrimitives>(defaultInitialBrandState)

    const filterdBrand = useMemo(() => {
        if (!categoryId) {
            return brands
        }

        return brands.filter(brand =>
            (brand as BrandApiResponse).model?.some(model =>
                model.categoryId === categoryId)
            )
        }, [brands, categoryId])
    const initialValue = useMemo(() => {
        return filterdBrand.find(brand => brand.id === value)
    }, [filterdBrand, value])

    return (
      <>
        {(!isAdd && type === 'form') 
            ? <ReadOnlyInputBox label='Marca' required defaultValue={initialValue?.name} />
        : <ComboBox
            id='brandId'
            initialValue={initialValue}
            label='Marca'
            name='brandId'
            type={type}                                        
            onChange={(_, newValue: NewValue) => {
                        if (typeof newValue === 'string') {
                            // timeout to avoid instant validation of the dialog's form.
                            setTimeout(() => {
                                toggleOpen(true)
                                setDialogValue({
                                    name: newValue
                                })
                            })
                        } else if (newValue && newValue.inputValue) {
                            toggleOpen(true)
                            setDialogValue({
                                name: newValue.inputValue
                            })
                        } else {
                            onChange('brandId', newValue ? newValue.id : '', Operator.EQUAL)
                        }
                    }}
            options={filterdBrand as BrandApiResponse[]}
            isDisabled={isDisabled}
            isRequired={isRequired}
            isError={!!error}
            errorMessage={error}
            loading={loading}
          />}
        {type === 'form' && 
          <BrandDialog
            dialogValue={dialogValue}
            open={open}
            toggleOpen={toggleOpen}
            createBrand={createBrand}
          />}
      </>
    )
}