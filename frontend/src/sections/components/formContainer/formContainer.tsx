import { lazy } from 'react'
import { useLocation } from 'react-router-dom'
import { type HistoryApiResponse } from '../../../modules/shared/domain/types/responseTypes'

interface Props {
  title: string
  description: string
  url?: string
  isAddForm: boolean
  isDisabled: boolean
  handleSubmit: (event: React.FormEvent) => Promise<void>
  handleClose: () => void
  lastUpdated?: string
  updatedBy?: HistoryApiResponse[]
  searchInput?: JSX.Element
}

const Main = lazy(async () => import('../Main'))
const PageTitle = lazy(async () => import("../Typography/PageTitle"))
const DetailsWrapper = lazy(async () => import("../DetailsWrapper/DetailsWrapper").then(m => ({ default: m.DetailsWrapper })))
const DetailsBoxWrapper = lazy(async () => import("../DetailsWrapper/DetailsBoxWrapper"))
const Subtitle = lazy(async () => import("../Typography/Subtitle").then(m => ({ default: m.Subtitle })))
const Paragraph = lazy(async () => import("../Typography/Paragraph").then(m => ({ default: m.Paragraph })))
const SearchSection = lazy(() => import('./SearchSection').then(m => ({ default: m.SearchSection })))
const AddIcon = lazy(() => import('../icon/AddIcon').then(m => ({ default: m.AddIcon })))
const FormComponent = lazy(() => import('./FormComponent').then(m => ({ default: m.FormComponent })))
const StepsToFollow = lazy(() => import('../stepsToFollow/StepsToFollow').then(m => ({ default: m.StepsToFollow })))
const RegisterEditStepsToFollow = lazy(() => import('../stepsToFollow/RegisterEditStepsToFollow').then(m => ({ default: m.RegisterEditStepsToFollow })))

export default function FormContainer({ url, title, description, searchInput, isAddForm, children, isDisabled, handleSubmit, handleClose, updatedBy, lastUpdated }: React.PropsWithChildren<Props>) {
  const location = useLocation()
  return (
    <Main content='max' overflow={false} className='pr-8'>
      <PageTitle title={`Gestión de ${title}`} />
      <DetailsWrapper borderColor='blue'>
        <DetailsBoxWrapper>
          <Subtitle variant='h2' color='blue' text={`Gestión de ${title} - ${isAddForm ? 'Registre un nuevo' : 'modifique un'} ${title}`} />
          <p className='inline-flex gap-1 text-center justify-center items-center '>
            <Paragraph color='gray' variant='span' text={description} />
            {!isAddForm ? <Paragraph color='white' variant='span' text='Agregar nuevo' backgroundColor='orange' icon={<AddIcon width={16} />} /> : null}
          </p>
          <SearchSection
            key={location.key}
            searchInput={searchInput}
            url={url}            
            isEdit={!isAddForm}
          />
        </DetailsBoxWrapper>
        <DetailsBoxWrapper position='center'>
          <FormComponent
            key={location.key}
            handleSubmit={handleSubmit}
            handleClose={handleClose}
            isDisabled={isDisabled}
            updatedBy={updatedBy}
            lastUpdated={lastUpdated}
          >
            {children}
          </FormComponent>
        </DetailsBoxWrapper>
      </DetailsWrapper>
      <StepsToFollow>
        <RegisterEditStepsToFollow />
      </StepsToFollow>
    </Main>
  )
}
