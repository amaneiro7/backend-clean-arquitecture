import { DeviceContextProvider, LocationProps } from "../Context/DeviceProvider";

export default function DeviceConsumer({children, location}: React.PropsWithChildren<{location?: LocationProps}>) {
  return (
    <DeviceContextProvider location={location}>
      {children}
    </DeviceContextProvider>
    
  )
}
