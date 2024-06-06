export const navigation = [
    {
        label: 'Listado de Perifericos',
        desc: 'Aqui se encuentran las rutas por categorias, equipos de computación, monitores, impresoras y partes y piezas',
        img: 'inventoryBox',
        navs: [
            {
                title: 'Equipos en Torre',
                desc: 'Equipos asignados en torre',
                path: '/equipos/torre',
            },
            {
                title: 'Equipos en Agencia',
                desc: 'Equipos asignados en agencia',
                path: '/equipos/agencia',
            },
            {
                title: 'Lista de equipos de computación',
                desc: 'Equipos asignados en agencia',
                path: '/device',
            },
            {
                title: 'Lista de Monitores',
                desc: 'Lista de Monitores',
                path: '/monitor',
            },
            {
                title: 'Lista de Impresoras',
                desc: 'Lista de Impresoras',
                path: '/printer',
            },
            {
                title: 'Lista de Impresoras Financieras',
                desc: 'Lista de Impresoras Financieras',
                path: '/finantialprinter',
            },
            {
                title: 'Lista de Partes y piezas',
                desc: 'Lista de Partes y piezas',
                path: '/parts',
            },
            {
                title: 'Filtro por Dispositvos',
                desc: 'Filtro por dispositivos',
                path: '/devicefilter',
            },
            {
                title: 'Listado de Sitios',
                desc: 'Listado de sitios',
                path: '/location',
            },
            {
                title: 'Listado de Modelos',
                desc: 'Listado de modelos',
                path: '/model',
            },
            {
                title: 'Almacén',
                desc: 'Equipos que se encuentran en el almacen',
                path: '/almacen',
            }
        ]
    },
    {
        label: 'Equipos en uso por usuario',
        desc: 'Aqui se encuentran las vistas por usuarios tanto de torre como de agencia',
        img: 'officeDesk',
        navs: [
            {
                title: 'Empleados en torre',
                desc: 'Usuarios asignados en torre',
                path: '/employees/torre',

            },
            {
                title: 'Empleados en agencia',
                desc: 'Usuarios asignados en agencia',
                path: '/employees/agencia',
            }
        ]
    },
    {
        label: 'Gestión',
        desc: 'Aqui se encuentran las rutas que se utilizan para la gestion de crear actualizar',
        img: 'codeScreen',
        navs: [
            {
                title: 'Agregar un nuevo dispositivo',
                desc: 'Aqui se puede agregar un nuevo dispositivo',
                path: '/device/add'
            },
            {
                title: 'Agregar un nuevo usuario',
                desc: 'Aqui se puede agregar un nuevo usuario',
                path: '/employee/add'
            },
            {
                title: 'Agregar un nuevo Modelo',
                desc: 'Aqui se puede agregar un nuevo modelo',
                path: '/model/add',
            },
            {
                title: 'Agregar una nueva ubicación',
                desc: 'Aqui se puede agregar una nueva ubicación',
                path: '/location/add'
            }
        ]
    }
]