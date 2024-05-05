import { lazy, Suspense, useMemo } from "react";
import { OnHandleChange } from "../../../modules/shared/domain/types/types";
import { useAppContext } from "../../Context/AppContext";
import { Operator } from "../../../modules/shared/domain/criteria/FilterOperators";
import { InputSkeletonLoading } from "../skeleton/inputSkeletonLoading";
import { useTypeOfSite } from "../../Hooks/locations/useTypeOfSite";

interface Props {
    value?: string
    onChange: OnHandleChange
    type?: 'form' | 'search'
}

const ComboBox = lazy(async () => import("./combo_box"));

export function TypeOfSiteComboBox({ value, onChange, type = 'search' }: Props) {
    const { repository } = useAppContext()
    const { typeOfSite, loading } = useTypeOfSite(repository)

    const initialValue = useMemo(() => {
        return typeOfSite.find(type => type.id === value)
    }, [typeOfSite, value])

    return (
        <Suspense fallback={<InputSkeletonLoading />}>
            <ComboBox
                id='typeOfSiteId'
                initialValue={initialValue}
                label="Tipo de Sitio"
                name='typeOfSiteId'
                type={type}
                onChange={(_, newValue) => {
                    onChange('typeOfSiteId', newValue ? newValue.id : '', Operator.EQUAL)
                }}
                options={typeOfSite}
                isDisabled={false}
                isRequired={type === 'form'}
                loading={loading}
            >
            </ComboBox>
        </Suspense>
    )
}