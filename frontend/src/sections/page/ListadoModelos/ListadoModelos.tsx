import { lazy, Suspense } from "react"
import { useDefaultInitialInputValue } from "./defaultParams"
import { useModelContext } from "../../Context/ModelProvider"
import { useInputsData } from "../../components/ListComponent/useInputData"
import { type ModelApiresponse } from "../../../modules/shared/domain/types/responseTypes"

const ListWrapper = lazy(async () => import("../../components/ListComponent/ListWrapper").then(m => ({ default: m.ListWrapper })))
const MainModelFilter = lazy(async () => import("../../components/ListComponent/MainModelFIlter").then(m => ({ default: m.MainModelFilter })))
const ModelTable = lazy(async () => import("./ModelTable").then(m => ({ default: m.ModelTable })))

export default function ListadoModelos() {
  const { inputData: initialInputData, defaultInputData } = useDefaultInitialInputValue()
  const { models, loading, addFilter, cleanFilters } = useModelContext()
  const { inputData, handleChange, handleClear } = useInputsData({ addFilter, cleanFilters, defaultInputData, initialInputData })

  const handleDownload = async () => {
    const clearDataset = await import('../../utils/clearModelDataset')
      .then(m => m.clearModelDataset({ models: models as ModelApiresponse[] }))
    await import('../../utils/downloadJsonToExcel').then(m => m.jsonToExcel({ clearDataset }))
  }
  return (
    <Suspense>
      <ListWrapper
        data={models}
        title='List de modelos'
        url='/model/add'
        loading={loading}
        handleChange={handleChange}
        handleClear={handleClear}
        handleDownload={handleDownload}
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