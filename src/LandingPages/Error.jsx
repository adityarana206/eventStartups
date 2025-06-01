import React from 'react'
import './Error.css'
import LoadingAnimation from '../Component/LoadingAnimation'
import animationData from '../Assets/Error/404.json'

function Error() {
    return (
        <div className='error-container'>
            <img className='page-not-found' src={'https://res.cloudinary.com/dffy79nhw/image/upload/v1726074687/Page_not_found_new_tizdys.png'} alt='loading image' />
        </div>
    )
}

export default Error