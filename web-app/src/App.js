import Router from './router/Router'
import {useEffect} from "react"
import Cookies from 'js-cookie'
import rs from '@consts/routes'
import {COOKIES_TYPES} from "./consts/consts"

const App = props => {
    useEffect(() => {
        const token = Cookies.get(COOKIES_TYPES.ACCESS_TOKEN)
        const user = Cookies.get(COOKIES_TYPES.USER_DATA)
        if (window.location.pathname !== rs.login && (token === undefined || user === undefined)) {
            window.location.href = rs.login
        } else if (window.location.pathname === rs.login && (token && user)) {
            window.location.href = rs.feeds
        }
    }, [])

    return <Router/>
}

export default App
