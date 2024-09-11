import { lazy, Suspense } from "react"
import { navigation } from "../../Routes/new.routes"

// const Main = lazy(() => import("../../components/Main"))
const Banner = lazy(() => import("../../components/Banner"))
const TilesSection = lazy(() => import("../../components/TilesSection/TilesSection").then((m) => ({ default: m.TilesSection })))
const TilesContainer = lazy(() => import("../../components/TilesSection/TilesContainer").then((m) => ({ default: m.TilesContainer })))
const TilesBox = lazy(() => import("../../components/TilesSection/TilesBox").then((m) => ({ default: m.TilesBox })))
const TilesInvisible = lazy(() => import("../../components/TilesSection/TilesInvisible").then((m) => ({ default: m.TilesInvisible })))
const TilesInvisibleInfo = lazy(() => import("../../components/TilesSection/TilesInvisibleInfo").then((m) => ({ default: m.TilesInvisibleInfo })))
const TilesVisible = lazy(() => import("../../components/TilesSection/TilesVisible").then((m) => ({ default: m.TilesVisible })))


export default function Home() {
  return (    
    <Suspense>
      {/* <Main content='max' overflow={false}> */}
      <Suspense>
        <Banner />
      </Suspense>

      <Suspense>
        <TilesSection>     
          <TilesContainer>
            {navigation.map((nav, index) => (            
              <TilesBox img={nav.img} key={nav.label}>              
                <TilesInvisible>
                  {nav.navs.map((info) => (
                    <TilesInvisibleInfo 
                      key={info.path} 
                      label={info.title} 
                      url={info.path}
                    />
                ))}
                </TilesInvisible>              
                <TilesVisible isPar={index} desc={nav.desc} title={nav.label} />              
              </TilesBox>            
            ))}
          </TilesContainer>     
        </TilesSection>      

      </Suspense>
      {/* </Main> */}
    </Suspense>
  )
}
