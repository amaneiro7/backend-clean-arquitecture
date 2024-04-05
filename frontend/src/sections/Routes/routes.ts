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

const dropdownNavs = [
  {
    label: 'Equipos en Uso',
    navs: [
      {
        title: 'Analytics',
        desc: 'Duis aute irure dolor in reprehenderit',
        path: 'javascript:void(0)',
        icon: 'icon'
      },
      {
        title: 'Agencia',
        desc: 'Equipos asignados en agencia',
        path: '/agencia',
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
      },
      {
        title: 'Community',
        desc: 'Duis aute irure dolor in reprehenderit',
        path: 'javascript:void(0)',
        icon: 'icon'

      }
    ]
  }, {
    label: 'Company',
    navs: [
      {
        title: 'About us',
        desc: 'Duis aute irure dolor in reprehenderit',
        path: 'javascript:void(0)',
        icon: 'icon'

      },
      {
        title: 'Careers',
        desc: 'Duis aute irure dolor in reprehenderit',
        path: 'javascript:void(0)',
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
