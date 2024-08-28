import { memo, useMemo } from "react"
import { HistoryApiResponse } from "../../modules/shared/domain/types/responseTypes"
import { lastHistoryUpdated } from "../utils/lastHistoryUpdated"

export const UpdatedBy = memo(({ history }: { history: HistoryApiResponse[] }) => {
    const sortHistroy = useMemo(() => (
        lastHistoryUpdated(history)
    ), [history])
    return (
      <span className='block'>Realizado por <strong>{sortHistroy?.user?.email ?? 'root'}</strong> </span>
    )
})