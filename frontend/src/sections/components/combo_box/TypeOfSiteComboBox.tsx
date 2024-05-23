import { lazy, Suspense, useMemo } from "react"
import { type OnHandleChange } from "../../../modules/shared/domain/types/types"
import { type TypeOfSitePrimitives } from "../../../modules/location/typeofsites/domain/typeOfSite"
import { Operator } from "../../../modules/shared/domain/criteria/FilterOperators"
import { InputSkeletonLoading } from "../skeleton/inputSkeletonLoading"
import { useTypeOfSite } from "../../Hooks/locations/useTypeOfSite"

interface Props {
    value?: string
    onChange: OnHandleChange
    isAddForm?: boolean
    type?: 'form' | 'search'
}

const ComboBox = lazy(async () => import("./combo_box"))
const ReadOnlyInputBox = lazy(async () => import('../ReadOnlyInputBox').then(m => ({ default: m.ReadOnlyInputBox })))

export function TypeOfSiteComboBox({ value, onChange, type = 'search', isAddForm = false }: Props) {
    const { typeOfSite, loading } = useTypeOfSite()

    const initialValue = useMemo(() => {
        return typeOfSite.find(type => type.id === value)
    }, [typeOfSite, value])

    return (
        <Suspense fallback={<InputSkeletonLoading />}>
            {
                !isAddForm && type === 'form'
                    ? <ReadOnlyInputBox label="Tipo de Sitio" required defaultValue={initialValue?.name} />
                    : <ComboBox
                        id='typeOfSiteId'
                        initialValue={initialValue}
                        label="Tipo de Sitio"
                        name='typeOfSiteId'
                        type={type}
                        onChange={(_, newValue: TypeOfSitePrimitives) => {
                            onChange('typeOfSiteId', newValue ? newValue.id : '', Operator.EQUAL)
                        }}
                        options={typeOfSite}
                        isDisabled={false}
                        isRequired={type === 'form'}
                        loading={loading}
                    >
                    </ComboBox>
            }
        </Suspense>
    )
}