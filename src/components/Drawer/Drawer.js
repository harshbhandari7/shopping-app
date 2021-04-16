import React from 'react';

import './Drawer.css';

const Drawer = (props) => (
    
    <div className={`${props.open?'animate':''} drawer`}>
        {props.children}
    </div> 

)

export default Drawer;