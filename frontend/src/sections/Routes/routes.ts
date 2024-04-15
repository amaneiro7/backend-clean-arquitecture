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
    path: '/employee/add',
    name: 'Agregar un nuevo usuario'
  },
  {
    id: 4,
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
        path: '/employees/torre',
        icon: 'icon'

      },
      {
        title: 'Empleados en agencia',
        desc: 'Usuarios asignados en agencia',
        path: '/employees/agencia',
        icon: 'icon'
      },
      {
        title: 'Directorio',
        desc: 'Directorio de usuarios',
        path: '/directorio',
        icon: 'icon'
      }
    ]
  }
]

export const dropdownAddsNavs: DropDown[] = [
  {
    label: 'Agregar Dispositivo',
    navs: [
      {
        title: 'Agregar un nuevo dispositivo',
        desc: 'Aqui se puede agregar un nuevo dispositivo',
        path: '/device/add',
        icon: 'icon'
      }
    ]
  }, {
    label: 'Agregar un nuevo Usuario',
    navs: [
      {
        title: 'Agregar un nuevo usuario',
        desc: 'Aqui se puede agregar un nuevo usuario',
        path: '/employee/add',
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
    name: 'Agregar',
    path: '#',
    isDrapdown: true,
    navs: dropdownAddsNavs
  },
  {
    name: 'Listado de Dispositivos',
    path: '#',
    isDrapdown: true,
    navs: dropdownNavs
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
