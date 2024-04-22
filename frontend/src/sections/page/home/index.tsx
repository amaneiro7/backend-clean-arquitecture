import Banner from '../../components/Banner/Banner'
import FeaturesCard from '../../components/FeaturesSection/FeaturesCard'
import FeaturesContainer from '../../components/FeaturesSection/FeaturesContainer'
import Section from '../../components/FeaturesSection/Section'
import Main from '../../components/Main'
import { dropdownNavs } from '../../Routes/routes'

export default function Home () {
  return (
    <Main className='flex-none'>

      <Banner />

      <Section>
        <div className='grid gap-y-8 gap-x-12 sm:grid-cols-2 lg:grid-cols-3'>
          {dropdownNavs.map((feature, index) => (
            <div className='border-2 border-secondary rounded-lg px-8 py-4' key={`feature-${index}`}>
              <h3 className='w-fit font-semibold text-lg text-secondary py-2'>{feature.label}</h3>
              <FeaturesContainer>
              {
                feature.navs.map((nav, index) => (
                  <FeaturesCard
                  key={`nav-${index}`}
                  title={nav.title}
                  desc={nav.desc}
                  icon={nav.icon}
                  path={nav.path}
                  />
                ))
              }
              </FeaturesContainer>
            </div>
          ))}

        </div>
      </Section>
    </Main>
  )
}
