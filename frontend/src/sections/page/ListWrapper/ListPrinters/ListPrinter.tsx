import { ListPage } from "../List"
import { useInputsData } from "../useInputData"
import { defaultCategoryQuery, defaultCategoryList } from "./defaultCategoryQuery"

export default function ListPrinter() {
    const { devices, handleChange, handleClear, inputData, loading } = useInputsData(defaultCategoryQuery)
    return (
      <ListPage
        defaultCategory={defaultCategoryList}
        devices={devices}
        handleChange={handleChange}
        handleClear={handleClear}
        inputData={inputData}
        loading={loading}
        title='Lista de impresoras'
      />
    )
}