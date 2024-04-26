import { lazy, Suspense } from "react";
import { OnHandleChange } from "../../../modules/shared/domain/types/types";
import { Primitives } from "../../../modules/shared/domain/value-object/Primitives";
import { useAppContext } from "../../Context/AppContext";
import { Operator } from "../../../modules/shared/domain/criteria/FilterOperators";
import { CategoryId } from "../../../modules/devices/category/domain/CategoryId";
import { useCategory } from "../../Device/category/useCategory";

interface Props {
    value: Primitives<CategoryId>    
    onChange: OnHandleChange
    type?: 'form' | 'search'
  }

  const ComboBox = lazy(async() => import("./combo_box"));  

export default function CategoryComboBox ({ onChange, type = 'search' }: Props) {
    const { repository } = useAppContext()
    const { categories, loading } = useCategory(repository)  


  
    return (
        <Suspense>
            <ComboBox
                id='categoryId'
                label="Categoria"
                name='categoryId'
                type={type}
                onChange={(_, newValue) => {
                    onChange('categoryId', newValue ? newValue.id : '', Operator.EQUAL)
                    
                }}
                options={categories}
                isRequired={false}
                isDisabled={false}
                loading={loading}
            >
            </ComboBox>
        </Suspense>
    )
}