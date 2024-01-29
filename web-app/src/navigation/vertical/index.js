import {Rss, Search, Users} from 'react-feather'
import rs from '@consts/routes'

export default [
    {
        id: 'feeds',
        title: 'Feeds',
        icon: <Rss size={20}/>,
        navLink: '/home'
    },
    {
        id: 'plantFinder',
        title: 'Plan Finder',
        icon: <Search size={20}/>,
        navLink: rs.plantFinder
    },
    {
        id: 'users',
        title: 'Users',
        icon: <Users size={20}/>,
        navLink: rs.users
    }
]
