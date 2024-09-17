export abstract class DashboardRepository {
  abstract countByCategory(): Promise<{}>
  abstract totalDevice(): Promise<{}>
}
