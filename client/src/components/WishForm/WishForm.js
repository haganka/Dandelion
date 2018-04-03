import React from "react";
import { Form, FormGroup, Col, Grid, Row, FormControl, ControlLabel, Button } from 'react-bootstrap';
// import {geolocated} from 'react-geolocated';
import Geolocation from "react-geolocation";
import './WishForm.css';


const WishForm = props =>

    <div className="wish-box">
    {/* <Grid> */}
    <Form>
        <FormGroup>
        <Row>
            <div className="current-loc-text">
                    Delivery location
            </div>
                <FormControl
                    className="location-input"
                    type="text"
                    value={props.locValue}
                    onChange={props.onChange}
                    name="location"
                    placeholder="delivery location (address, city, state)"
                />
        </Row>
        </FormGroup>

        <FormGroup controlId="formControlsSelect">
            <Row>
            <div className="business">
            Choose a business
            </div>
                <FormControl 
                className="bus-select"
                onChange={props.onChange}
                name="business"
                componentClass="select" placeholder="select">
                    <option value="">Select</option>
                    <option value="starbucks">Starbucks</option>
                    <option value="walgreens">Walgreens</option>
                    <option value="chipotle">Chipotle</option>
                    <option value="trader joes">Trader Joe's</option>
                    <option value="starfruit">Starfruit</option>
                    <option value="protien bar">Protien Bar</option>
                    <option value="dominoes">Dominoes</option>
                </FormControl>
            </Row>
        </FormGroup>

        <FormGroup>
            <Row>
            <div className="request">
            Request 
            </div>
            <FormControl
                type="text"
                value={props.reqValue}
                onChange={props.onChange}
                name="request"
                placeholder="your request"
            />
            </Row>
        </FormGroup>
            <Row>
            <Col sm={12} className="wish-submit-box">
                <Button
                    className="wish-submit"
                    onClick={props.onSubmit}
                    disabled={!(props.busValue && props.locValue && props.reqValue)}
                    >Wish
                </Button>
            </Col>
        </Row>
    </Form>
  </div>;

export default WishForm;