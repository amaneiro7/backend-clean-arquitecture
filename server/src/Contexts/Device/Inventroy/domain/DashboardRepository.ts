export abstract class DashboardRepository {
  abstract countByCategory(): Promise<{}>
  abstract totalDevice(): Promise<{}>
  abstract countByOperatingSystem(): Promise<{}>
  abstract countByTypeOfSiteAndOperatingSystem(): Promise<{}>
  abstract countTypeOfSite(): Promise<{}>
}
