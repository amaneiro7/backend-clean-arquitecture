import { lazy, Suspense, useMemo } from "react"
import { OnHandleChange } from "../../../../modules/shared/domain/types/types"
import { Operator } from "../../../../modules/shared/domain/criteria/FilterOperators"
import { InputSkeletonLoading } from "../../skeleton/inputSkeletonLoading"
import { type CityPrimitives } from "../../../../modules/location/city/domain/city"
import { type Primitives } from "../../../../modules/shared/domain/value-object/Primitives"
import { type StateId } from "../../../../modules/location/state/domain/StateId"
import { type CityId } from "../../../../modules/location/city/domain/CityId"
import { useAppContext } from "../../../Context/AppProvider"

interface Props {
    value?: Primitives<CityId>
    state?: Primitives<StateId>
    onChange: OnHandleChange
    isAddForm?: boolean
    type?: "form" | "search"
}

const ComboBox = lazy(async () => import("../combo_box"))
const ReadOnlyInputBox = lazy(async () => import("../../ReadOnlyInputBox").then((m) => ({ default: m.ReadOnlyInputBox })))

export function CityComboBox({ value, state, onChange, type = "search", isAddForm = false }: Props) {
    const { useCity: { cities, loading }} = useAppContext()
    
    const filtered = useMemo(() => {
      if (!state) return cities
      return cities.filter((city) => city.stateId === state)
    }, [cities, state])
    
    const initialValue = useMemo(() => {
        return filtered.find((city) => city.id === value)
    }, [filtered, value])

    return (
      <Suspense fallback={<InputSkeletonLoading />}>
        {!isAddForm && type === "form" 
          ? <ReadOnlyInputBox label='Ciudad' required defaultValue={initialValue?.name} />
          : <ComboBox
              id='cityId'
              initialValue={initialValue}                
              label='Ciudad'
              name='cityId'
              type={type}
              onChange={(_, newValue: CityPrimitives) => {
                        onChange("cityId", newValue ? newValue.id : "", Operator.EQUAL)
                    }}
              options={filtered}
              isDisabled={false}
              isRequired={type === "form"}
              loading={loading}
            />}
      </Suspense>
    )
}
