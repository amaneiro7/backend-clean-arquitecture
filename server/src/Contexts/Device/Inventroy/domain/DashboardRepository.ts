export abstract class DashboardRepository {
  abstract countByCategory(): Promise<{}>
}
