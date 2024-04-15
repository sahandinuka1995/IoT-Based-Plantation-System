import React from "react"
import FallbackSpinner from "./Fallback-spinner"
import './style.css'

const ApiSpinner = () => {
    return <div className={'position-fixed w-100 api-loader-bg'}>
        <FallbackSpinner/>
    </div>
}

export default ApiSpinner