import { Suspense, lazy } from "react";
import { navigation } from "../../Routes/new.routes";
import { InputSkeletonLoading } from "../../components/skeleton/inputSkeletonLoading";
import { MainFallback } from "../../components/skeleton/MainFallback";

const TilesContainer = lazy(async () => import("../../components/TilesSection/TilesContainer").then((m) => ({ default: m.TilesContainer })));
const TilesBox = lazy(async () => import("../../components/TilesSection/TilesBox").then((m) => ({ default: m.TilesBox })));
const TilesInvisible = lazy(async () => import("../../components/TilesSection/TilesInvisible").then((m) => ({ default: m.TilesInvisible })));
const TilesVisible = lazy(async () => import("../../components/TilesSection/TilesVisible").then((m) => ({ default: m.TilesVisible })));
const TilesInvisibleInfo = lazy(async () => import("../../components/TilesSection/TilesInvisibleInfo").then((m) => ({ default: m.TilesInvisibleInfo })));
const Banner = lazy(async () => await import("../../components/Banner"));
const TilesSection = lazy(async () => await import("../../components/TilesSection/TilesSection").then((m) => ({ default: m.TilesSection })));
const Main = lazy(async () => await import("../../components/Main"));

export default function Home() {
  return (
    <Suspense fallback={<MainFallback />}>
      <Main content="max">
        <Suspense fallback={<InputSkeletonLoading />}>
          <Banner />
        </Suspense>

        <Suspense>
          <TilesSection>
            <Suspense>
              <TilesContainer>
                {navigation.map((nav) => (
                  <Suspense>
                    <TilesBox img={nav.img} key={nav.label}>
                      <Suspense>
                        <TilesInvisible>
                          {nav.navs.map((info) => (
                            <Suspense>                              
                              <TilesInvisibleInfo key={info.path} label={info.title} url={info.path} />
                            </Suspense>
                          ))}
                        </TilesInvisible>
                      </Suspense>
                      <Suspense>                        
                        <TilesVisible desc={nav.desc} title={nav.label} />
                      </Suspense>
                    </TilesBox>
                  </Suspense>
                ))}
              </TilesContainer>
            </Suspense>
          </TilesSection>
        </Suspense>
      </Main>
    </Suspense>
  );
}
