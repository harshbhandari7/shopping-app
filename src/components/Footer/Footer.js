import React, {useState} from 'react';

import Drawer from '../Drawer/Drawer';
import './Footer.css';

const Footer = () => {
    const FooterElements = ['Contact Us', 'Terms & Condtions', 'FAQ','Privacy Policy' ];
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const toggle = () => setIsDrawerOpen(!isDrawerOpen);

    return(
        
        <>
            <div 
                className='footer-container footer'
                onClick = {toggle}>
                FAQ
            </div>
            <div>
                <Drawer open = {isDrawerOpen}>
                    <div 
                        className='footer'
                        onClick={toggle}>
                        FAQ
                    </div>
                    
                    <div className='footer'>
                        {FooterElements.map((ele,index) => (
                            <div className = 'footer' key = {index}>
                                <h6>{ele}</h6>
                            </div>
                        ))}
                    </div>
                    
                </Drawer>
            </div>

        </>
    )
}

export default Footer;