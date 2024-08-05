import { lazy, useMemo, useState } from 'react'
import { useRegisterPage } from '../useRegisterPage'
import { type SelectChangeEvent } from '@mui/material'
import { EditHandle } from './EditHandle'
import { ResetHandle } from './Resethandle'
import { DeleteHandle } from './Deletehandle'

const UserManagementAction = lazy(async () => import('../../../components/Select/UserManagementActions').then(m => ({ default: m.UserManagementAction })))
const DescriptionDesc = lazy(async () => import('../../../components/DetailsWrapper/DescriptionDesc').then(m => ({ default: m.DescriptionDesc })))
const DetailsBoxWrapper = lazy(async () => import('../../../components/DetailsWrapper/DetailsBoxWrapper'))
const DescriptionListElement = lazy(async () => import('../../../components/DetailsWrapper/DescriptionListElement').then(m => ({ default: m.DescriptionListElement })))
const DetailsInfo = lazy(async () => import('../../../components/DetailsWrapper/DetailsInfo').then(m => ({ default: m.DetailsInfo })))

type ACTION = 'reset' | 'delete' | 'editar'


export default function ManagementProfile() {
  const { formData } = useRegisterPage()
  const [action, setAction] = useState<ACTION>('editar')
   const handleClick = (e: SelectChangeEvent) => {
    const value = e.target.value as unknown as ACTION
    setAction(value)
   }   

   const title = useMemo(() => {
    if (action === 'editar') return 'Editar'
    if (action === 'reset') return 'Restablecer contraseña'
    if (action === 'delete') return 'Eliminar Usuario'
    return 'Seleccione'
   },[action])
  
  return (
    <>
      <DetailsBoxWrapper>
        <DetailsInfo title='Información del usuario'>
          <DescriptionListElement title='Nombre'><DescriptionDesc desc={formData.name} /></DescriptionListElement>
          <DescriptionListElement title='Apellido'><DescriptionDesc desc={formData.lastName} /></DescriptionListElement>
          <DescriptionListElement title='Correo'><DescriptionDesc desc={formData.email} /></DescriptionListElement>
          <DescriptionListElement title='Role'><DescriptionDesc desc={formData.role?.name} /></DescriptionListElement>          
          <UserManagementAction onChange={handleClick} value={action} />
          <DescriptionListElement title={title}>
            {action === 'editar' ? <EditHandle id={formData.id} /> : 
            action === 'reset' ? <ResetHandle id={formData.id} /> : 
            action === 'delete' ? <DeleteHandle id={formData.id} /> : null}
          </DescriptionListElement>
        </DetailsInfo>
      </DetailsBoxWrapper>      
    </>
  )
}
