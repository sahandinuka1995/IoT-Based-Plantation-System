// ** React Imports
import {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'

// ** Custom Components
import Avatar from '@components/avatar'
// ** Third Party Components
import {UncontrolledDropdown, DropdownMenu, DropdownToggle, DropdownItem} from 'reactstrap'
import {Power} from 'react-feather'

// ** Default Avatar Image
import defaultAvatar from '@src/assets/images/portrait/small/avatar-s-11.jpg'
import Cookies from "js-cookie"
import {COOKIES_TYPES} from "../../../../consts/consts"

const UserDropdown = () => {
    // ** State
    const [userData, setUserData] = useState(null)

    //** ComponentDidMount
    useEffect(() => {
        console.log(localStorage.getItem(COOKIES_TYPES.USER_DATA))
        if (!localStorage.getItem(COOKIES_TYPES.USER_DATA)) {
            setUserData(JSON.parse(localStorage.getItem(COOKIES_TYPES.USER_DATA)))
        }
    }, [])

    //** Vars
    const userAvatar = (userData && userData.avatar) || defaultAvatar

    const onLogout = () => {
        Cookies.remove(COOKIES_TYPES.ACCESS_TOKEN)
        Cookies.remove(COOKIES_TYPES.USER_DATA)
    }
    console.log(userData)
    return (
        <UncontrolledDropdown tag='li' className='dropdown-user nav-item'>
            <DropdownToggle href='/' tag='a' className='nav-link dropdown-user-link' onClick={e => e.preventDefault()}>
                <div className='user-nav d-sm-flex d-none'>
                    <span
                        className='user-name font-weight-bold'>{(userData && userData['name']) || 'Sahan Dinuka'}</span>
                    <span className='user-status'>{(userData && userData.role) || 'Admin'}</span>
                </div>
                <Avatar img={userAvatar} imgHeight='40' imgWidth='40' status='online'/>
            </DropdownToggle>
            <DropdownMenu right>
                {/*<DropdownItem tag={Link} to='#' onClick={e => e.preventDefault()}>*/}
                {/*    <User size={14} className='mr-75'/>*/}
                {/*    <span className='align-middle'>Profile</span>*/}
                {/*</DropdownItem>*/}
                <DropdownItem tag={Link} to='/login' onClick={onLogout}>
                    <Power size={14} className='mr-75'/>
                    <span className='align-middle'>Logout</span>
                </DropdownItem>
            </DropdownMenu>
        </UncontrolledDropdown>
    )
}

export default UserDropdown
