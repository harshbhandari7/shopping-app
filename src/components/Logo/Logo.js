import React from 'react';

import brandLogo from '../../assets/images/brandLogo.ico';
import './Logo.css';

const Logo = (props) => {
    return(
        <>
            <img src = {brandLogo} alt="Shopify-logo" />
        </>
    )
}

export default Logo;
