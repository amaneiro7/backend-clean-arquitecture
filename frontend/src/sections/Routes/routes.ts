export const routes = [
  {
    id: 1,
    path: '/',
    name: 'Inicio'
  },
  {
    id: 2,
    path: '/device/add',
    name: 'Agregar Dispositivo'
  },
  {
    id: 3,
    path: '/dashboard',
    name: 'Balance'
  }
]

export const dropdownNavs: DropDown[] = [
  {
    label: 'Equipos en uso por dispositivo',
    navs: [
      {
        title: 'Equipos en Torre',
        desc: 'Equipos asignados en torre',
        path: '/equipos/torre',
        icon: 'icon'
      },
      {
        title: 'Equipos en Agencia',
        desc: 'Equipos asignados en agencia',
        path: '/equipos/agencia',
        icon: 'icon'
      }
    ]
  }, {
    label: 'Equipos en Almacen',
    navs: [
      {
        title: 'Almacén',
        desc: 'Equipos que se encuentran en el almacen',
        path: '/almacen',
        icon: 'icon'
      }
    ]
  }, {
    label: 'Equipos en uso por usuario',
    navs: [
      {
        title: 'Empleados en torre',
        desc: 'Usuarios asignados en torre',
        path: '/empleados/torre',
        icon: 'icon'

      },
      {
        title: 'Empleados en agencia',
        desc: 'Usuarios asignados en agencia',
        path: '/empleados/agencia',
        icon: 'icon'
      }
    ]
  }
]

export const navigation: Navigation[] = [
  {
    name: 'Inicio',
    path: '/',
    isDrapdown: false
  },
  {
    name: 'Agregar Dispositivo',
    path: '/device/add',
    isDrapdown: false
  },
  {
    name: 'Listado de Dispositivos',
    path: '#',
    isDrapdown: true,
    navs: dropdownNavs
  },
  {
    name: 'Customers',
    path: 'dashboad',
    isDrapdown: false
  },
  {
    name: 'Balance',
    path: 'dashboad',
    isDrapdown: false
  }
]

export interface Navigation {
  name: string
  path: string
  isDrapdown: boolean
  navs?: DropDown[]
}

export interface DropDown {
  label: string
  navs: DropDownNavs[]
}

export interface DropDownNavs {
  title: string
  desc: string
  path: string
  icon: string
}
