// ** Logo
import logo from '@src/assets/images/logo/logo_transparent.png'

const SpinnerComponent = () => {
    return (
        <div className='fallback-spinner vh-100'>
            <img className='fallback-logo' src={logo} alt='logo' width={75}/>
            <div className='loading'>
                <div className='effect-1 effects'></div>
                <div className='effect-2 effects'></div>
                <div className='effect-3 effects'></div>
            </div>
        </div>
    )
}

export default SpinnerComponent
