import { lazy } from "react"
import { useNavigate } from "react-router-dom"
import { useInputsData } from "./useInputData"
import { SpinnerSKCircle } from "../../components/Loading/spinner-sk-circle"
import { type ModelApiresponse } from "../../../modules/shared/domain/types/responseTypes"

const Main = lazy(async () => import('../../components/Main'))
const PageTitle = lazy(async () => import('../../components/Typography/PageTitle'))
const FilterSection = lazy(() => import('./FilterSection').then(m => ({ default: m.FilterSection })))
const ButtonSection = lazy(async () => import("./ButtonSection").then((m) => ({ default: m.ButtonSection })))
const ModelTable = lazy(async () => import('./ModelTable').then(m => ({ default: m.ModelTable })))


export default function ListadoModelos() {
    const navigate = useNavigate()
    const { inputData,models, handleChange, handleClear, loading } = useInputsData()

    const handleDownload = async () => {
      const clearDataset = await import('../../utils/clearModelDataset')
        .then(m => m.clearModelDataset({models: models as ModelApiresponse[]}))
      await import('../../utils/downloadJsonToExcel').then(m => m.jsonToExcel({clearDataset}))      
    }

    const handleAdd = () => {
      navigate('/model/add')
    }
    return (
      <Main>          
        <PageTitle title='Listado de Modelos' />
          
        <FilterSection handleChange={handleChange} inputData={inputData} />

        <ButtonSection handleExportToExcel={handleDownload} handleAdd={handleAdd} handleClear={handleClear}  />

        {loading && <SpinnerSKCircle />}
        {(!loading && models.length === 0) && <p>No hay resultados</p>}
        <ModelTable models={models as ModelApiresponse[]} categoryId={inputData.categoryId} />       
      </Main>
      
    )
}