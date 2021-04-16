import React from 'react';

import {Card, Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

const EmptyList = (props) => {
    const {title} = props;
    return(
        <Card
            className = 'no-auth-card'
            bg='light'
            text='dark'>
            <Card.Body>
                <h5 className='text-align-center'>{title} is empty!</h5>
                <Link to = '/products'>    
                    <Button 
                        className = "login-button" 
                        variant = "primary">
                        Add Prdoucts
                    </Button>
                </Link>
            </Card.Body>
        </Card>
    )
}

export default EmptyList;