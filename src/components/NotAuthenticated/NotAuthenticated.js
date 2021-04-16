import React from 'react';
import {Link} from 'react-router-dom';
import {Button, Card,} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../containers/Cart/Cart.css';
import './NotAuthenticated.css';

const NotAuthenticated = () => {
    return(
        <>
            <Card
                className = 'no-auth-card'
                bg='light'
                text='dark'>
                {/* style={{ width: '30rem' }}> */}
                <Card.Body className='text-align-center'>
                
                        <h5>Wow, such empty.</h5>
                        <p>Login to see the items you added previously</p>
                    <Link to = '/login'>    
                        <Button 
                            className = "login-button" 
                            variant = "primary">
                                Login
                        </Button>
                    </Link>
                        
                </Card.Body>
            </Card>

        </>
    )
}

export default NotAuthenticated;