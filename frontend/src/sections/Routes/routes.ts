export const routes = [
  {
    id: 1,
    path: '/',
    name: 'Inicio',
    auth: 'static'
  },
  {
    id: 2,
    path: '/device/add',
    name: 'Agregar Dispositivo',
    auth: 'private'
  },
  {
    id: 3,
    path: '/dashboard',
    name: 'Balance',
    auth: 'private'
  },
  {
    id: 4,
    path: '/login',
    name: 'Iniciar Sesion',
    auth: 'public'
  },
  {
    id: 5,
    path: '/logout',
    name: 'Cerrar Sesion',
    auth: 'private'
  }
]
