import { lazy, Suspense, useEffect, useMemo, useState } from "react";
import { DeviceEmployee } from "../../../modules/devices/devices/devices/domain/DeviceEmployee";
import { StatusId } from "../../../modules/devices/devices/status/domain/StatusId";
import { OnHandleChange } from "../../../modules/shared/domain/types/types";
import { Primitives } from "../../../modules/shared/domain/value-object/Primitives";
import { useAppContext } from "../../Context/AppContext";
import { Operator } from "../../../modules/shared/domain/criteria/FilterOperators";
import { BrandId } from "../../../modules/devices/brand/domain/BrandId";
import { CategoryId } from "../../../modules/devices/category/domain/CategoryId";
import { useBrand } from "../../Device/brand/useBrand";
import { BrandPrimitives } from "../../../modules/devices/brand/domain/Brand";
import { BrandApiResponse } from "../../../modules/shared/domain/types/responseTypes";

interface Props {
    value: Primitives<BrandId>
    categoryId?: Primitives<CategoryId>
    onChange: OnHandleChange
    type?: 'form' | 'search'
  }

  const ComboBox = lazy(async() => import("./combo_box"));
  const BrandDialog = lazy(async () => import("../Dialog/BrandDialog"));

export default function BrandComboBox ({ value, onChange, categoryId, type = 'search' }: Props) {
    const { repository } = useAppContext()
    const { brands, loading } = useBrand(repository)  
    const [errorMessage, setErrorMessage] = useState('')
    const [isError, setIsError] = useState(false)
    const [isDisbaled, setIsDisbled] = useState(false)
    const [open, toggleOpen] = useState(false)
    const [dialogValue, setDialogValue] = useState<BrandPrimitives>({name: ''});

    const filterdBrand = useMemo(() => {
        if (categoryId === undefined || categoryId === '') {
          return brands
        }
    
        return brands.filter(brand =>
          (brand as BrandApiResponse).model?.some(model =>
            model.categoryId === categoryId)
        )
      }, [brands, categoryId])

    useEffect(() => {
        if (type !== 'form') return;

        if (value === undefined) return
        
    
        const isValid = DeviceEmployee.isValid(value, status)
        setIsDisbled(StatusId.StatusOptions.INUSE !== status)
    
        setIsError(!isValid)
        setErrorMessage(isValid ? '' : DeviceEmployee.invalidMessage())
    
        return () => {
          setErrorMessage('')
          setIsError(false)
        }
      }, [value, status])
  
    return (
        <Suspense>
            <ComboBox
                id='brandId'
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
                isDisabled={isDisbaled}
                isRequired={false}
                isError={isError}
                loading={loading}
                errorMessage={errorMessage}
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