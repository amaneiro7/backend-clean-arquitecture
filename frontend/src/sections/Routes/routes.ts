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
    label: 'Products',
    navs: [
      {
        title: 'Analytics',
        desc: 'Duis aute irure dolor in reprehenderit',
        path: 'javascript:void(0)',
        icon: 'icon'
      },
      {
        title: 'Reports',
        desc: 'Duis aute irure dolor in reprehenderit',
        path: 'javascript:void(0)',
        icon: 'icon'
      }
    ]
  }, {
    label: 'Resources',
    navs: [
      {
        title: 'Blog',
        desc: 'Duis aute irure dolor in reprehenderit',
        path: 'javascript:void(0)',
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

export const navigation = [
  { name: 'Inicio', path: '/', isDrapdown: false },
  { name: 'Agregar Dispositivo', path: '/device/add' },
  { name: 'drapdown', path: '#', isDrapdown: true, navs: dropdownNavs },
  { name: 'Customers', path: 'dashboad', isDrapdown: false },
  { name: 'Balance', path: 'dashboad', isDrapdown: false }
]
