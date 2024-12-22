import { useCallback, useMemo } from "react"
import { type SearchByCriteriaQuery } from "@/modules/shared/infraestructure/criteria/SearchByCriteriaQuery"


export type HandlePage = {
    handleLimitChange: (value: number) => void
    handlePageClick: (event: { selected: number }) => void
    totalPages: number
    showingMessage: string
    currentPage: number
}

export const useHandlePage = ({
    addFilter,
    limit,
    offset,
    total
}: {
    addFilter: (filter: SearchByCriteriaQuery) => void
    limit: number
    offset: number
    total: number
}): HandlePage => {
    const currentPage = useMemo(() => offset / limit + 1, [offset, limit])
    // Handle the change in the limit.
    const handleLimitChange = useCallback((value: number) => {
        addFilter({ limit: value })
    }, [addFilter])

    // Handle the change in the page.    
    const totalPages = useMemo(() => Math.ceil(total / limit), [total, limit])

    const showingMessage = useMemo(() => {
        const start = offset + 1
        const end = Math.min(offset + limit, total)
        return `Mostrando ${start} - ${end} de ${total}`
    }, [offset, limit, total])

    const handlePageClick = (event: { selected: number }) => {
        const newOffset = (event.selected * limit) % total

        console.log(`User requested page number ${event.selected}, which is offset ${newOffset}`)

        addFilter({ offset: newOffset })
    }

    return {
        handleLimitChange,
        handlePageClick,
        totalPages,
        showingMessage,
        currentPage
    }
}