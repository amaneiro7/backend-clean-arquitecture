import { type HistoryApiResponse } from "../../Device/Device/infrastructure/sequelize/DeviceResponse"

export function lastHistoryUpdated(history: HistoryApiResponse[]) {
    return history.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())[0]
}