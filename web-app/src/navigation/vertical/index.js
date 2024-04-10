import {Rss, Search, Users} from 'react-feather'
import rs from '@consts/routes'
import Cookies from "js-cookie"
import {COOKIES_TYPES, USER_ROLES} from "../../consts/consts"

const user = Cookies.get(COOKIES_TYPES.USER_DATA)
let data = null
if (user) data = JSON.parse(user)

const navigation = [
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
    }
]

if (data?.role === USER_ROLES.ADMIN) {
    navigation.push({
        id: 'users',
        title: 'Users',
        icon: <Users size={20}/>,
        navLink: rs.users
    })
}

export default navigation
