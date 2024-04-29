import { useMemo } from "react"

export function LastUpdated({ updatedAt }: { updatedAt: string }) {
    const formattedUpdatedAt = useMemo(() => (
        formattedDate(updatedAt)
    ), [updatedAt])
    return (
        <p className="absolute bottom-0 right-0 text-sm text-black/80">Actualizado el {formattedUpdatedAt}</p>
    )
}

function formattedDate(date: string) {
    return new Date(date).toLocaleString()

}
