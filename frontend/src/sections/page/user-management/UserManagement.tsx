import { lazy, useMemo } from "react"
import { Outlet, useLocation } from "react-router-dom"
import { StepsToFollow } from "../../components/stepsToFollow/StepsToFollow"
import { StepsText } from "../../components/stepsToFollow/StepsText"


const Main = lazy(async () => import("../../components/Main"))
const PageTitle = lazy(async () => import("../../components/Typography/PageTitle"))
const SearchSection = lazy(async () => import("../../components/formContainer/SearchSection"))
const DetailsWrapper = lazy(async () => import("../../components/DetailsWrapper/DetailsWrapper").then(m => ({ default: m.DetailsWrapper })))
const DetailsBoxWrapper = lazy(async () => import("../../components/DetailsWrapper/DetailsBoxWrapper"))
const Paragraph = lazy(async () => import("../../components/Typography/Paragraph").then(m => ({ default: m.Paragraph })))
const Subtitle = lazy(async () => import("../../components/Typography/Subtitle").then(m => ({ default: m.Subtitle })))
const UsersSearchComboBox = lazy(async () => import("../../components/combo_box/UsersSearchComboBox").then(m => ({ default: m.UsersSearchComboBox })))


export default function UserManagement() {  
    const location = useLocation()
    const pageIs = useMemo(() => {
      if (location.pathname.includes('register')) return 'register'
      if (location.pathname.includes('profile')) return 'profile'
      if (location.pathname.includes('')) return 'edit'
      return null
    }, [location.pathname])

    console.log(pageIs)
    return (
      <Main content='max' overflow={false}>
        <PageTitle title='Gestión de usuarios' />
        <DetailsWrapper borderColor='blue'>
          <DetailsBoxWrapper>
            <Subtitle variant='h2' color='blue' text='Gestión de Usuario' />
            <Paragraph color='blue' variant='p' text='Ingrese el correo del usuario que desea gestionar' />
            <SearchSection
              key={location.key}
              searchInput={<UsersSearchComboBox />}
              url='/user-management/register'
              isEdit
            />
          </DetailsBoxWrapper>          
          <Outlet />          
        </DetailsWrapper>
        <StepsToFollow>
          <StepsText requisito='Obligatorio' />
        </StepsToFollow>
      </Main>
    )
}