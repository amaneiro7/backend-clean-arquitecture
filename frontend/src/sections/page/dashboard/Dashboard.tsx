import { lazy, Suspense } from "react"

import Chart from "./Chart";

const Main = lazy(() => import("@/sections/components/Main"))
const PageTitle = lazy(async () => import("@/sections/components/Typography/PageTitle"))
const DetailsWrapper = lazy(async () => import("@/sections/components/DetailsWrapper/DetailsWrapper").then(m => ({ default: m.DetailsWrapper })))
const Subtitle = lazy(async () => import("@/sections/components/Typography/Subtitle").then(m => ({ default: m.Subtitle })))

export default function Dashboard() {
  return (
    <Suspense fallback={<main className='flex-1' />}>
      <Main content='max' overflow={false} className='pr-8'>
        <PageTitle title='Dashboard' />
        <Suspense>
          <DetailsWrapper>
            <div className='w-full p-4 flex gap-8'>
              <div className='w-56 p-4 justify-center bg-white flex flex-col gap-8 aspect-video rounded-md border border-cancel'>
                <Subtitle text='Total' textTransform='capitalize' />
                <p className='text-3xl font-bold text-gray-900'>910</p>
              </div>
              <div className='w-56 p-4 justify-center bg-white flex flex-col gap-8 aspect-video rounded-md border border-cancel'>
                <Subtitle text='Total Computadoras' textTransform='capitalize' />
                <p className='text-3xl font-bold text-gray-900'>742</p>
              </div>
              <div className='w-56 p-4 justify-center bg-white flex flex-col gap-8 aspect-video rounded-md border border-cancel'>
                <Subtitle text='Total Laptops' textTransform='capitalize' />
                <p className='text-3xl font-bold text-gray-900'>57</p>
              </div>
              <div className='w-56 p-4 justify-center bg-white flex flex-col gap-8 aspect-video rounded-md border border-cancel'>
                <Subtitle text='Total Servidores' textTransform='capitalize' />
                <p className='text-3xl font-bold text-gray-900'>1</p>
              </div>
              <div className='w-56 p-4 justify-center bg-white flex flex-col gap-8 aspect-video rounded-md border border-cancel'>
                <Subtitle text='Total All in One' textTransform='capitalize' />
                <p className='text-3xl font-bold text-gray-900'>110</p>
              </div>
            </div>
            <Chart />
          </DetailsWrapper>
        </Suspense>
      </Main>
    </Suspense>
  )
}
