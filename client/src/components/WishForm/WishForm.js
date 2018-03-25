import React from "react";
import { Form, FormGroup, Col, Row, FormControl, ControlLabel, Button } from 'react-bootstrap';
import {geolocated} from 'react-geolocated';


const WishForm = props =>

    <div className="wish-box">
    <Form>

        <FormGroup>
            <Row>
            <Col sm={2}>
                <Button onClick={props.getLocation}>Use my current location</Button>
            </Col>
            <Col sm={2} componentClass={ControlLabel}>
            or enter delivery location 
            </Col>
            <Col sm={8}>
            <FormControl
                type="text"
                value={props.locValue}
                onChange={props.onChange}
                name="location"
                placeholder="delivery location"
            />
            </Col>
            </Row>
        </FormGroup>

        <FormGroup controlId="formControlsSelect">
            <Row>
            <Col sm={2} componentClass={ControlLabel}>
            Choose a business
            </Col>
            <Col sm={10}>
                {/* <FormControl 
                onChange={props.onChange}
                value={props.busValue}
                componentClass="select" placeholder="select">
                    <option value={props.busSelect}>Starbucks</option>
                    <option value="walgreens">Walgreens</option>
                    <option value="dominoes">Dominoes</option>
                </FormControl> */}

            <FormControl
                type="text"
                value={props.busValue}
                onChange={props.onChange}
                name="business"
                placeholder="business name"
            />
            </Col>
            </Row>
        </FormGroup>

        <FormGroup>
            <Row>
            <Col sm={2} componentClass={ControlLabel}>
            Request 
            </Col>
            <Col sm={10}>
            <FormControl
                type="text"
                value={props.reqValue}
                onChange={props.onChange}
                name="request"
                placeholder="your request"
            />
            </Col>
            </Row>
        </FormGroup>
        <Row>
        <Button
            onClick={props.onSubmit}
            disabled={!(props.busValue && props.locValue && props.reqValue)}
            >Wish
        </Button>
        </Row>
    </Form>
  </div>;

export default WishForm;