import { lazy, Suspense, useMemo } from "react";
import { OnHandleChange } from "../../../modules/shared/domain/types/types";
import { Primitives } from "../../../modules/shared/domain/value-object/Primitives";
import { useAppContext } from "../../Context/AppContext";
import { Operator } from "../../../modules/shared/domain/criteria/FilterOperators";
import { CategoryId } from "../../../modules/devices/category/domain/CategoryId";
import { useCategory } from "../../Device/category/useCategory";
import { InputSkeletonLoading } from "../skeleton/inputSkeletonLoading";

interface Props {
    value: Primitives<CategoryId>    
    onChange: OnHandleChange
    type?: 'form' | 'search'
  }

  const ComboBox = lazy(async() => import("./combo_box"));  

export default function CategoryComboBox ({ value, onChange, type = 'search' }: Props) {
    const { repository } = useAppContext()
    const { categories, loading } = useCategory(repository)

    const initialValue = useMemo(() => {
        return categories.find(category => category.id === value)
    }, [categories, value])

    return (
        <Suspense fallback={<InputSkeletonLoading />}>
            <ComboBox
                id='categoryId'
                initialValue={initialValue}
                label="Categoria"
                name='categoryId'
                type={type}
                onChange={(_, newValue) => {
                    onChange('categoryId', newValue ? newValue.id : '', Operator.EQUAL)
                    
                }}
                options={categories}
                isRequired={type === 'form'}
                isDisabled={false}
                loading={loading}
            >
            </ComboBox>
        </Suspense>
    )
}