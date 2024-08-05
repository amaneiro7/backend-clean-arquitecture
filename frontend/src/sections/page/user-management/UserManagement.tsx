import { lazy } from "react"
import { Outlet, useLocation } from "react-router-dom"


const SearchSection = lazy(async () => import("../../components/formContainer/SearchSection"))
const DetailsBoxWrapper = lazy(async () => import("../../components/DetailsWrapper/DetailsBoxWrapper"))

const UsersSearchComboBox = lazy(async () => import("../../components/combo_box/UsersSearchComboBox").then(m => ({ default: m.UsersSearchComboBox })))
const DetailsWrapper = lazy(async () => import("../../components/DetailsWrapper/DetailsWrapper").then(m => ({ default: m.DetailsWrapper })))
const Main = lazy(async () => import("../../components/Main"))
const PageTitle = lazy(async () => import("../../components/PageTitle"))


export default function UserManagement() {  
    const location = useLocation()
    return (
      <Main content='max' overflow={false}>
        <PageTitle title='Gestión de usuarios' />
        <DetailsWrapper title='Directorio de usuarios de servicio de la aplicación'>
          <DetailsBoxWrapper>
            <p>Gestion de Usuario</p>
            <SearchSection
              key={location.key}
              searchInput={<UsersSearchComboBox />}
              url='/user-management/register'
              isEdit
            />

          </DetailsBoxWrapper>          
          <Outlet />          
        </DetailsWrapper>       
      </Main>
    )
}