import React from "react";
import { Form, FormGroup, Col, Row, FormControl, ControlLabel, Button } from 'react-bootstrap';
// import {geolocated} from 'react-geolocated';
import Geolocation from "react-geolocation";

const options = ["starbucks", "walgreens", "chipotle"];

const WishForm = props =>

    <div className="wish-box">
    <Form>
        <FormGroup>
        <Row>
            <Col sm={10}>
            <Geolocation
                onSuccess={console.log}
                render={({
                    fetchingPosition,
                    position: { coords: { latitude, longitude } = {} } = {},
                    error,
                    getCurrentPosition
                }) =>
                    <div>
                        <Button onClick={getCurrentPosition}>Use my Current Location</Button><span>  or enter delivery location below</span> 
                    </div>}
                />
            </Col>
        </Row>
            <Row>

            <Col sm={8}>
            <FormControl
                type="text"
                value={props.locValue}
                onChange={props.onChange}
                name="location"
                placeholder="delivery location (address, city, state)"
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
                <FormControl 
                onChange={props.onChange}
                name="business"
                componentClass="select" placeholder="select">
                    <option value="">Select</option>
                    <option value="starbucks">Starbucks</option>
                    <option value="walgreens">Walgreens</option>
                    <option value="dominoes">Chipotle</option>
                </FormControl>
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