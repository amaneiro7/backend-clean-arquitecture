import { lazy, Suspense, useMemo, useState } from "react";
import { OnHandleChange } from "../../../modules/shared/domain/types/types";
import { Primitives } from "../../../modules/shared/domain/value-object/Primitives";
import { useAppContext } from "../../Context/AppContext";
import { Operator } from "../../../modules/shared/domain/criteria/FilterOperators";
import { BrandId } from "../../../modules/devices/brand/domain/BrandId";
import { CategoryId } from "../../../modules/devices/category/domain/CategoryId";
import { ModelApiresponse } from "../../../modules/shared/domain/types/responseTypes";
import { useModel } from "../../Hooks/model/useMode";
import { ModelId } from "../../../modules/devices/model/model/domain/ModelId";
import { InputSkeletonLoading } from "../skeleton/inputSkeletonLoading";
import { ModelPrimitives } from "../../../modules/devices/model/model/domain/Model";

interface Props {
    value: Primitives<ModelId>
    categoryId: Primitives<CategoryId>
    brandId: Primitives<BrandId>
    onChange: OnHandleChange
    type?: 'form' | 'search'
  }

  const ComboBox = lazy(async() => import("./combo_box"));
  const ModelDialog = lazy(async () => import("../Dialog/ModelDialog"));

export default function ModelComboBox ({ value, onChange, categoryId, brandId, type = 'search' }: Props) {
    const { repository } = useAppContext()
    const { models, loading } = useModel(repository)  
    const [open, toggleOpen] = useState(false)
    const [dialogValue, setDialogValue] = useState<ModelPrimitives>({
        name: '',
        categoryId: '',
        brandId: ''
    })

    const initialValue = useMemo(() => {
        return models.find(model => model.id === value)
    }, [models, value])

    const filterdModel = useMemo(() => {
        return (models as unknown as ModelApiresponse[]).filter(model => {
          const category = model.categoryId === categoryId || (categoryId === undefined || categoryId === '')
          const brand = model.brandId === brandId || (brandId === undefined || brandId === '')
          return category && brand
        })
      }, [models, categoryId, brandId])

    return (
        <Suspense fallback={<InputSkeletonLoading/>}>
            <ComboBox
                id='modelId'
                initialValue={initialValue}
                label="Modelo"
                name='modelId'
                type={type}
                onChange={(_, newValue) => {
                    if (typeof newValue === 'string') {
                        // timeout to avoid instant validation of the dialog's form.
                        setTimeout(() => {
                            toggleOpen(true)
                            setDialogValue(prev => ({...prev, value: newValue}))
                        })
                    } else if (newValue && newValue.inputValue) {
                        toggleOpen(true);
                        setDialogValue(prev => ({...prev, name: newValue.inputValue}));
                    } else {
                        onChange('modelId', newValue ? newValue.id : '', Operator.EQUAL)
                    }
                }}
                options={filterdModel}
                isDisabled={false}
                isRequired={type === 'form'}
                loading={loading}
            >
            {type === 'form' && (
                <Suspense>
                    <ModelDialog  dialogValue={dialogValue} open={open} toggleOpen={toggleOpen}/>
                </Suspense>
            )}
            </ComboBox>
        </Suspense>
    )
}