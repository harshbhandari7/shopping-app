import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Carousel} from 'react-bootstrap';

import carousel1 from '../../assets/images/home/Shopify1.png';
import './Home.css';
const carouselContent = [{heading:'Electronics', subHeading:'Best Deals Available'},
                            {heading:'Apparels', subHeading:'20-50% OFF.'},
                            {heading:'Grocery', subHeading:'All at one place.'},]
const Home = () => {
    return(
        <>
            <Carousel interval = {3000}>
            {
                carouselContent.map(item => (
                    
                    <Carousel.Item>
                        <img
                            style = {{height:"51vh"}}
                            className="d-block w-100"
                            src={carousel1}
                            alt="slide"
                        />
                        <Carousel.Caption>
                            <h3>{item.heading}</h3>
                            <p>{item.subHeading}</p>
                        </Carousel.Caption>
                    </Carousel.Item >
                    
                ))
            }
            </Carousel>
        </>
    )
}

export default Home;
