import { createContext, useContext } from "react";
import { type UseBrand, useBrand } from "../Hooks/brand/useBrand";
import { type UseEmployee, useEmployee } from "../Hooks/employee/useEmployee";
import { type UseCategory, useCategory } from "../Hooks/category/useCategory";
import { type UseStatus, useStatus } from "../Hooks/status/useStatus";
import { type UseModel, useModel } from "../Hooks/model/useModel";
import { useSiteLocation, type UseSiteLocation } from "../Hooks/locations/useLocation";
import { useProcessor, type UseProcessor } from "../Hooks/processor/useProcessor";
import { useMemoryRamType, type UseMemoryRamType } from "../Hooks/memoryRam/useMemoryRamType";

export interface AppContextState {
    useCategory: UseCategory
    useStatus: UseStatus
    useBrand: UseBrand
    useModel: UseModel
    useEmployee: UseEmployee
    useSiteLocation: UseSiteLocation
    useProcessor: UseProcessor,
    useMemoryRamType: UseMemoryRamType
}

export const AppContext = createContext({} as AppContextState)

export const AppContextProvider = ({ children }: React.PropsWithChildren) => {
    return (
      <AppContext.Provider value={{
            useCategory: useCategory(),
            useStatus: useStatus(),
            useBrand: useBrand(),
            useModel: useModel(),
            useEmployee: useEmployee(),
            useSiteLocation: useSiteLocation(),
            useProcessor: useProcessor(),
            useMemoryRamType: useMemoryRamType()
        }}
      >
        {children}
      </AppContext.Provider>
    )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAppContext = () => {
    const context = useContext(AppContext)
    if (context === undefined) {
        throw new Error('useAppContext must be used within a AppConextProvider')
    }
    return context
}