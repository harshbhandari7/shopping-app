import React from 'react';

import Auxi from '../Auxi/Auxi';
import Header from '../../components/Header/Header';

import Footer from '../../components/Footer/Footer';
import './Layout.css';

const Layout = (props) => {
    
    return(
        <Auxi>
            <Header />
            <main>
                {props.children}
                <br/>
            </main>
            <Footer />
            {/* <h1 style={{width:'100%', backgroundColor:'blue'}}>hello</h1> */}
        </Auxi>
    )
}

export default Layout;