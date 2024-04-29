import { lazy, Suspense, useMemo, useState } from "react";
import { OnHandleChange } from "../../../modules/shared/domain/types/types";
import { Primitives } from "../../../modules/shared/domain/value-object/Primitives";
import { useAppContext } from "../../Context/AppContext";
import { Operator } from "../../../modules/shared/domain/criteria/FilterOperators";
import { BrandId } from "../../../modules/devices/brand/domain/BrandId";
import { CategoryId } from "../../../modules/devices/category/domain/CategoryId";
import { useBrand } from "../../Device/brand/useBrand";
import { BrandPrimitives } from "../../../modules/devices/brand/domain/Brand";
import { BrandApiResponse } from "../../../modules/shared/domain/types/responseTypes";
import { InputSkeletonLoading } from "../Loading/inputSkeletonLoading";

interface Props {
    value?: Primitives<BrandId>
    categoryId?: Primitives<CategoryId>
    onChange: OnHandleChange
    type?: 'form' | 'search'
  }

  const ComboBox = lazy(async() => import("./combo_box"));
  const BrandDialog = lazy(async () => import("../Dialog/BrandDialog"));

export default function BrandComboBox ({ value, onChange, categoryId, type = 'search' }: Props) {
    const { repository } = useAppContext()
    const { brands, loading } = useBrand(repository)  
    const [open, toggleOpen] = useState(false)
    const [dialogValue, setDialogValue] = useState<BrandPrimitives>({name: ''});

    const initialValue = useMemo(() => {
        return brands.find(brand => brand.id === value)
    }, [brands, value])


    const filterdBrand = useMemo(() => {
        if (categoryId === undefined || categoryId === '') {
          return brands
        }
    
        return brands.filter(brand =>
          (brand as BrandApiResponse).model?.some(model =>
            model.categoryId === categoryId)
        )
      }, [brands, categoryId])
  
    return (
        <Suspense fallback={<InputSkeletonLoading />}>
            <ComboBox
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
                        toggleOpen(true);
                        setDialogValue({
                            name: newValue.inputValue
                        });
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
                    <BrandDialog  dialogValue={dialogValue} open={open} toggleOpen={toggleOpen}/>
                </Suspense>
            )}
            </ComboBox>
        </Suspense>
    )
}