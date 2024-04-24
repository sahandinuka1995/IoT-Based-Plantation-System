// ** Checks if an object is empty (returns boolean)
import Cookies from "js-cookie"
import {COOKIES_TYPES} from "../consts/consts"
import {getSensorData} from "../services/sensorService"
import moment from "moment/moment"
import EnvData from "../modal/envData"

export const isObjEmpty = obj => Object.keys(obj).length === 0

// ** Returns K format from a number
export const kFormatter = num => (num > 999 ? `${(num / 1000).toFixed(1)}k` : num)

// ** Converts HTML to string
export const htmlToString = html => html.replace(/<\/?[^>]+(>|$)/g, '')

// ** Checks if the passed date is today
const isToday = date => {
    const today = new Date()
    return (
        /* eslint-disable operator-linebreak */
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear()
        /* eslint-enable */
    )
}

/**
 ** Format and return date in Humanize format
 ** Intl docs: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/format
 ** Intl Constructor: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat
 * @param {String} value date to format
 * @param {Object} formatting Intl object to format with
 */
export const formatDate = (value, formatting = {month: 'short', day: 'numeric', year: 'numeric'}) => {
    if (!value) return value
    return new Intl.DateTimeFormat('en-US', formatting).format(new Date(value))
}

// ** Returns short month of passed date
export const formatDateToMonthShort = (value, toTimeForCurrentDay = true) => {
    const date = new Date(value)
    let formatting = {month: 'short', day: 'numeric'}

    if (toTimeForCurrentDay && isToday(date)) {
        formatting = {hour: 'numeric', minute: 'numeric'}
    }

    return new Intl.DateTimeFormat('en-US', formatting).format(new Date(value))
}

/**
 ** Return if user is logged in
 ** This is completely up to you and how you want to store the token in your frontend application
 *  ? e.g. If you are using cookies to store the application please update this function
 */
export const isUserLoggedIn = () => localStorage.getItem(COOKIES_TYPES.USER_DATA)
export const getUserData = () => JSON.parse(localStorage.getItem(COOKIES_TYPES.USER_DATA))

/**
 ** This function is used for demo purpose route navigation
 ** In real app you won't need this function because your app will navigate to same route for each users regardless of ability
 ** Please note role field is just for showing purpose it's not used by anything in frontend
 ** We are checking role just for ease
 * ? NOTE: If you have different pages to navigate based on user ability then this function can be useful. However, you need to update it.
 * @param {String} userRole Role of user
 */
export const getHomeRouteForLoggedInUser = userRole => {
    if (userRole === 'admin') return '/'
    if (userRole === 'client') return '/access-control'
    return '/login'
}

// ** React Select Theme Colors
export const selectThemeColors = theme => ({
    ...theme,
    colors: {
        ...theme.colors,
        primary25: '#7367f01a', // for option hover bg-color
        primary: '#7367f0', // for selected option bg-color
        neutral10: '#7367f0', // for tags bg-color
        neutral20: '#ededed', // for input border-color
        neutral30: '#ededed' // for input hover border-color
    }
})

export const getCookiesData = () => {
    const user = Cookies.get(COOKIES_TYPES.USER_DATA)
    return JSON.parse(user)
}

export const findObject = (array, value) => {
    return array.find(obj => {
        return obj.value === value
    })
}

export const roundValues = (value) => {
    let result = value
    if (value > 1000) result = value / 1000
    if (value > 100) result = value / 100

    return Number.parseFloat(result).toFixed(2)
}

export const getSensorDataCommon = async () => {
    let sensorData = null

    const res = await getSensorData()
    if (res?.data) {
        const dates = []
        const n = []
        const p = []
        const k = []
        const humidity = []
        const rainfall = []
        const temperature = []
        const ph = []

        const currentData = res?.data?.currentData
        const envData = new EnvData()
        envData.n = currentData._n
        envData.p = currentData._p
        envData.k = currentData._k
        envData.temperature = currentData._temperature
        envData.humidity = currentData._humidity
        envData.ph = currentData._ph
        envData.rainfall = currentData._rainfall

        res?.data?.previousData?.map(item => {
            dates.push(moment(item._date).format('hh:mm:ss'))
            n.push(item._n)
            p.push(item._p)
            k.push(item._k)
            humidity.push(item._humidity)
            rainfall.push(item._rainfall)
            temperature.push(item._temperature)
            ph.push(item._ph)
        })

        sensorData = {...res?.data, dates, n, p, k, humidity, rainfall, temperature, ph, currentData: envData}
    }

    return sensorData
}