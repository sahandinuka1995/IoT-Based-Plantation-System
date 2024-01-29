import {lazy} from 'react'
import rs from '@consts/routes'

// ** Document title
const TemplateTitle = '%s - Vuexy React Admin Template'

// ** Default Route
const DefaultRoute = '/home'

// ** Merge Routes
const Routes = [
    {
        path: '/home',
        component: lazy(() => import('../../views/Home'))
    },
    {
        path: rs.plantFinder,
        component: lazy(() => import('../../views/PlantFinder'))
    },
    {
        path: rs.users,
        component: lazy(() => import('../../views/Users'))
    },
    {
        path: '/login',
        component: lazy(() => import('../../views/Login')),
        layout: 'BlankLayout',
        meta: {
            authRoute: true
        }
    },
    {
        path: '/error',
        component: lazy(() => import('../../views/Error')),
        layout: 'BlankLayout'
    }
]

export {DefaultRoute, TemplateTitle, Routes}
