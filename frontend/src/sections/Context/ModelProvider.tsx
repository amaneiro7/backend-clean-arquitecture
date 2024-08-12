import { createContext, useContext, useEffect } from "react"
import { type SearchByCriteriaQuery } from "../../modules/shared/infraestructure/criteria/SearchByCriteriaQuery"
import { type ModelPrimitives } from "../../modules/devices/model/model/domain/Model"
import { useSearchByCriteriaQuery } from "../Hooks/useQueryUpdate"
import { useModelByCriteria } from "../Hooks/model/useModelByCriteria"
import { useCreateModel } from "../Hooks/model/useCreateModel"


export interface ModelContextState {
    models: ModelPrimitives[]
    error: string
    loading: boolean
    createModel: (formData: ModelPrimitives) => Promise<void>    
    addFilter: (payload: SearchByCriteriaQuery) => void
    cleanFilters: () => void
    query: SearchByCriteriaQuery
}

export const ModelContext = createContext({} as ModelContextState)

export const ModelContextProvider = ({ children }: React.PropsWithChildren) => {
    const { models, loading, error, searchModelsByCriteria } = useModelByCriteria()
    const { addFilter, cleanFilters, query } = useSearchByCriteriaQuery()
    const { createModel } = useCreateModel()

    const handleCreate = async (formData: ModelPrimitives) => {
      const res = await createModel(formData)
      searchModelsByCriteria(query)
      return res
    }

  useEffect(() => {
    searchModelsByCriteria(query)
  }, [query, searchModelsByCriteria])

        return(
          <ModelContext.Provider value={{
              models,
              error,
              loading,
              createModel: handleCreate,
              addFilter,
              cleanFilters, 
              query,
            }}
          >
            {children}
          </ModelContext.Provider>
    )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useModelContext = () => {
    const context = useContext(ModelContext)
    if (context === undefined) {
        throw new Error("useModelContext must be used within a ModelContextProvider")
    }
    return context
}