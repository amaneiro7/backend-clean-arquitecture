import { Suspense, lazy } from 'react'
import { dropdownNavs } from '../../Routes/routes'
import { InputSkeletonLoading } from '../../components/skeleton/inputSkeletonLoading'

const Banner = lazy(async () => await import('../../components/Banner'))
const FeaturesCard = lazy(async () => await import('../../components/FeaturesSection/FeaturesCard'))
const FeaturesContainer = lazy(async () => await import('../../components/FeaturesSection/FeaturesContainer'))
const Section = lazy(async () => await import('../../components/FeaturesSection/Section'))
const Main = lazy(async () => await import('../../components/Main'))

export default function Home() {
  return (
    <Suspense>
      <Main className='flex-none'>

        <Suspense fallback={<InputSkeletonLoading />}>
          <Banner />
        </Suspense>
        <Suspense>
          <Section>
            <div className='grid gap-y-8 gap-x-12 sm:grid-cols-2 lg:grid-cols-3'>
              {dropdownNavs.map((feature, index) => (
                <div className='border-2 border-secondary rounded-lg px-8 py-4' key={`feature-${index}`}>
                  <h3 className='w-fit font-semibold text-lg text-secondary py-2'>{feature.label}</h3>
                  <Suspense>
                    <FeaturesContainer>
                      {
                        feature.navs.map((nav, index) => (
                          <Suspense key={`nav-${index}`} >
                            <FeaturesCard
                              title={nav.title}
                              desc={nav.desc}
                              icon={nav.icon}
                              path={nav.path}
                            />
                          </Suspense>
                        ))
                      }
                    </FeaturesContainer>

                  </Suspense>
                </div>
              ))}
            </div>
          </Section>
        </Suspense>
      </Main>
    </Suspense>
  )
}
