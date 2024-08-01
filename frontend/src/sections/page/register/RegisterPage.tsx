import { lazy, Suspense } from 'react'
import { InputSkeletonLoading } from '../../components/skeleton/inputSkeletonLoading'
import { useRegisterPage } from './useRegisterPage'
import { FormStatus } from '../../Hooks/useGenericForm'
import { useLocation } from 'react-router-dom'

const Main = lazy(async () => import('../../components/Main'))
const Input = lazy(() => import('../../components/text-inputs/Input').then(m => ({ default: m.Input })))
const FormContainer = lazy(async () => import('../../components/formContainer/formContainer'))
const RoleComboBox = lazy(async () => import('../../components/combo_box/RolesComboBox'))
const UsersSearchComboBox = lazy(async () => import('../../components/combo_box/UsersSearchComboBox').then(m => ({default: m.UsersSearchComboBox})))
export default function RegisterPage() {
 const { formData, errors, handleChange, handleSubmit, handleClose, formStatus } = useRegisterPage()
  const location = useLocation()
  
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  handleChange(e.target.name, e.target.value)
 }

  return (
    <Main content='max' overflow={false}>
    
      <FormContainer
        key={location.key}
        title='Usuario'
        handleSubmit={handleSubmit}
        handleClose={handleClose}
        isDisabled={formStatus === FormStatus.Loading}        
        url='/user-management/register'
        searchInput={<UsersSearchComboBox />}
      >
        <div className='flex flex-col md:flex-row md:gap-8'>
          <Suspense fallback={<InputSkeletonLoading />}>                  
            <Input
              label='Nombre'
              type='text'
              name='name'
              onChange={handleOnChange}
              value={formData.name}
              errorMessage={errors.name}
              error={errors.name ? true : false}                    
              isRequired
            />
          </Suspense>
          <Suspense fallback={<InputSkeletonLoading />}>                  
            <Input
              label='Apellido'
              type='text'
              name='lastName'
              onChange={handleOnChange}
              value={formData.lastName}
              errorMessage={errors.lastName}
              error={errors.lastName ? true : false}                    
              isRequired
            />
          </Suspense>

        </div>
        <Suspense fallback={<InputSkeletonLoading />}>                  
          <Input
            label='Correo Electrónico'
            type='email'
            name='email'
            onChange={handleOnChange}
            value={formData.email}
            errorMessage={errors.email}
            error={errors.email ? true : false}                    
            isRequired
          />
        </Suspense>
        <Suspense>
          <RoleComboBox 
            onChange={handleChange}
            value={formData.roleId}
            type='form'            
          />
        </Suspense>
      </FormContainer>
    </Main>
  )
}
