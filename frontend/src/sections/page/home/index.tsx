import FeaturesCard from '../../components/FeaturesSection/FeaturesCard'
import FeaturesContainer from '../../components/FeaturesSection/FeaturesContainer'
import Section from '../../components/FeaturesSection/Section'
import SectionTitle from '../../components/FeaturesSection/SectionTitle'
import PageTitle from '../../components/PageTitle'
import { dropdownNavs } from '../../Routes/routes'

export default function Home () {
  return (
    <main className='max-w-full h-full flex flex-col gap-5 p-5'>
      <PageTitle title='InventarioApp' />

      <Section>
        <SectionTitle
          title="Simple solutions for complex issues"
          text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec congue, nisl eget molestie varius, enim ex faucibus purus"
        />
        <div className='grid gap-y-8 gap-x-12 sm:grid-cols-2 lg:grid-cols-3'>
          {dropdownNavs.map((feature, index) => (
            <div className='' key={`feature-${index}`}>
              <h2 className='font-medium text-lg py-2'>{feature.label}</h2>
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
    </main>
  )
}
