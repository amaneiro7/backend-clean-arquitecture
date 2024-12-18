import { lazy, Suspense } from "react"
import { useDefaultInitialInputValue } from "./defaultParams"
import { useModelContext } from "@/sections/Context/ModelProvider"
import { useInputsData } from "@/sections/components/ListComponent/useInputData"
import { type ModelApiresponse } from "@/sections/../modules/shared/domain/types/responseTypes"

const ListWrapper = lazy(async () => import("@/sections/components/ListComponent/ListWrapper").then(m => ({ default: m.ListWrapper })))
const MainModelFilter = lazy(async () => import("@/sections/components/ListComponent/MainModelFIlter").then(m => ({ default: m.MainModelFilter })))
const ModelTable = lazy(async () => import("./ModelTable").then(m => ({ default: m.ModelTable })))

export default function ListadoModelos() {
  const { inputData: initialInputData, defaultInputData } = useDefaultInitialInputValue()
  const { models, query, loading, addFilter, cleanFilters } = useModelContext()
  const { inputData, handleChange, handleClear } = useInputsData({ addFilter, cleanFilters, defaultInputData, initialInputData })

  return (
    <Suspense>
      <ListWrapper
        query={query}
        total={models.length}        
        title='List de modelos'
        url='/model/add'
        loading={loading}
        handleChange={handleChange}
        handleClear={handleClear}
        mainFilter={
          <Suspense>
            <MainModelFilter
              handleChange={handleChange}
              brandId={inputData.brandId}
              categoryId={inputData.categoryId}
              id={inputData.id}
            />
          </Suspense>
        }
        table={
          <Suspense>
            <ModelTable
              models={models as ModelApiresponse[]}
              categoryId={inputData.categoryId}
            />
          </Suspense>
        }
      />
    </Suspense>

  )
}