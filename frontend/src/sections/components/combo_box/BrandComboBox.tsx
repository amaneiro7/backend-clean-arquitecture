import { lazy, Suspense, useMemo, useState } from "react"
import { OnHandleChange } from "../../../modules/shared/domain/types/types"
import { Primitives } from "../../../modules/shared/domain/value-object/Primitives"
import { Operator } from "../../../modules/shared/domain/criteria/FilterOperators"
import { BrandId } from "../../../modules/devices/brand/domain/BrandId"
import { CategoryId } from "../../../modules/devices/category/domain/CategoryId"
import { useBrand } from "../../Hooks/brand/useBrand"
import { BrandPrimitives } from "../../../modules/devices/brand/domain/Brand"
import { BrandApiResponse } from "../../../modules/shared/domain/types/responseTypes"
import { InputSkeletonLoading } from "../skeleton/inputSkeletonLoading"
import { defaultInitialBrandState } from "../../Hooks/brand/BrandFormInitialState"


interface Props {
    value?: Primitives<BrandId>
    categoryId?: Primitives<CategoryId>
    onChange: OnHandleChange
    type?: 'form' | 'search'
    isAdd?: boolean
}

const ComboBox = lazy(async () => import("./combo_box"))
const BrandDialog = lazy(async () => import("../Dialog/BrandDialog"))
const ReadOnlyInputBox = lazy(async () => import("../ReadOnlyInputBox").then(m => ({ default: m.ReadOnlyInputBox })))

export default function BrandComboBox({ value, onChange, categoryId, type = 'search', isAdd = false }: Props) {
    const { brands, loading } = useBrand()
    const [open, toggleOpen] = useState(false)
    const [dialogValue, setDialogValue] = useState<BrandPrimitives>(defaultInitialBrandState)

    const initialValue = useMemo(() => {
        return brands.find(brand => brand.id === value)
    }, [brands, value])


    const filterdBrand = useMemo(() => {
        if (!categoryId) {
            return brands
        }

        return brands.filter(brand =>
            (brand as BrandApiResponse).model?.some(model =>
                model.categoryId === categoryId)
        )
    }, [brands, categoryId])

    return (
        <Suspense fallback={<InputSkeletonLoading />}>
            {(!isAdd && type === 'form') ?
                <ReadOnlyInputBox label="Marca" required defaultValue={initialValue?.name} />
                : <ComboBox
                    id='brandId'
                    initialValue={initialValue}
                    label="Marca"
                    name='brandId'
                    type={type}
                    onChange={(_, newValue) => {
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
                    isDisabled={false}
                    isRequired={type === 'form'}
                    loading={loading}

                >
                    {type === 'form' && (
                        <Suspense>
                            <BrandDialog dialogValue={dialogValue} open={open} toggleOpen={toggleOpen} />
                        </Suspense>
                    )}
                </ComboBox>}
        </Suspense>
    )
}