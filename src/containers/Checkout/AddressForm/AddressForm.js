import React from 'react';
import {Form,Col, Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import './AddressForm.css';

const AddressForm = () => {
    const states = ['Goa','Madhya Pradesh', 'Gujrat', 'Mizoram', 'Punjab','Rajasthan'];
    
    const onFormSubmitHandler = (event) => {
        event.preventDefault();
    }
    
    return(
        <>
        
        <div className = 'Form'>
            <Form onSubmit = {onFormSubmitHandler}>
                <Form.Row>
                    <Form.Group as={Col}>
                    <Form.Label>First Name</Form.Label>
                    <Form.Control type="plaintext" placeholder="Enter first Name" />
                    </Form.Group>

                    <Form.Group as={Col}>
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control type="plaintext" placeholder="Enter Last Name" />
                    </Form.Group>
                </Form.Row>

                <Form.Group controlId="formGridAddress1">
                    <Form.Label>Address</Form.Label>
                    <Form.Control placeholder="1234 Main St" />
                </Form.Group>

                <Form.Group controlId="formGridAddress2">
                    <Form.Label>Address 2</Form.Label>
                    <Form.Control placeholder="Apartment or floor" />
                </Form.Group>

                <Form.Row>
                    <Form.Group as={Col} controlId="formGridCity">
                    <Form.Label>City</Form.Label>
                    <Form.Control />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridState">
                    <Form.Label>State</Form.Label>
                    <Form.Control as="select">
                        {states.map((state,index) => (
                            <option key ={index}>{state}</option>
                            ))
                        }
                        
                    </Form.Control>
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridZip">
                    <Form.Label>Zip</Form.Label>
                    <Form.Control />
                    </Form.Group>
                </Form.Row>

                <Form.Group id="formGridCheckbox">
                    <Form.Check type="checkbox" label="Check me out" />
                </Form.Group>

                <Button className = 'CenterElements' variant="primary" type="submit">
                    Place Order
                </Button>
            </Form>
        </div>
        </>
    )
}

export default AddressForm;
