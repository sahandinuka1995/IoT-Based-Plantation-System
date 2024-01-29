// ** Icons Import
import {Heart} from 'react-feather'

const Footer = () => {
    return (
        <p className='clearfix mb-0'>
      <span className='float-md-left d-block d-md-inline-block mt-25'>
        COPYRIGHT © {new Date().getFullYear()}{' '}
          <a href='#' target='_blank' rel='noopener noreferrer'>
          AgroPulse
        </a>
        <span className='d-none d-sm-inline-block'>, All rights Reserved</span>
      </span>
            <span className='float-md-right d-none d-md-block'>
        Developed by <a href="http://www.google.com/search?q=Sahan+Dinuka" target={'_blank'}>Sahan Dinuka</a>
      </span>
        </p>
    )
}

export default Footer
