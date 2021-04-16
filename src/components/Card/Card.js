import React,{useState, useRef} from 'react';
import {Card, Button, Tooltip, Overlay} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import './Card.css';

const CardDisplay = props => {
    const [show1, setShow1] = useState(false);
    const [show2, setShow2] = useState(false);
    const target1 = useRef(null);
    const target2= useRef(null);
    const {listItem, onLeftButtonClick, onRightButtonClick, btn1text, btn2text, toolTipMsg } = props;
    return (
            <Card bsprefix='card'>
                <Card.Img className = 'CardImg' variant="top" src={listItem.imgUrl} />
                <Card.Body>
                    <Card.Title className='text-center'>{listItem.name}</Card.Title>
                        <Card.Text className='text-center'>
                            Product Price : Rs. {listItem.price} 
                        </Card.Text>
                            <div className='button-wrapper'>
                            <Button ref = {target1} onClick ={() => {onLeftButtonClick(); setShow1(true)}} variant="primary">{btn1text}
                                <Overlay
                                    target={target1.current} 
                                    show={show1} 
                                    rootClose = {true}
                                    onHide={() => setShow1(false)}
                                    rootCloseEvent='mousedown'
                                    placement="bottom">
                                    {(props) => (
                                        <Tooltip id="overlay-example" {...props}>
                                            {toolTipMsg.leftBtn}
                                        </Tooltip>
                                    )}
                                </Overlay>
                            </Button>
                            <Button ref = {target2} onClick = {() => {onRightButtonClick(); setShow2(true)}} variant="primary">{btn2text}
                                <Overlay
                                    target={target2.current} 
                                    show={show2} 
                                    rootClose = {true}
                                    onHide={() => setShow2(false)}
                                    rootCloseEvent = 'mousedown'
                                    placement="bottom">
                                    {(props) => (
                                        <Tooltip id="overlay-example" {...props}>
                                            {toolTipMsg.rightBtn}
                                        </Tooltip>
                                    )}
                                </Overlay>
                            </Button>
                    </div>
                </Card.Body>
            </Card>
    )
}

export default CardDisplay;