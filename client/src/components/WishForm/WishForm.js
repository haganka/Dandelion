import React from "react";
import { Form, FormGroup, Col, Grid, Row, FormControl, ControlLabel, Button } from 'react-bootstrap';
// import {geolocated} from 'react-geolocated';
import Geolocation from "react-geolocation";
import './WishForm.css';

const options = ["starbucks", "walgreens", "chipotle"];

const WishForm = props =>

    <div className="wish-box">
    <Grid>
    <Form>
        <FormGroup>
        <Row>

            <Geolocation
                onSuccess={console.log}
                render={({
                    fetchingPosition,
                    position: { coords: { latitude, longitude } = {} } = {},
                    error,
                    getCurrentPosition
                }) =>
                    <div>
                        <Row>
                        <Col sm={4}>
                            <Button className="current-loc-submit" onClick={getCurrentPosition}>Use my Current Location</Button>
                        </Col>
                        </Row>
                        <Row>
                            <Col sm={2} componentClass={ControlLabel} className="current-loc-text">
                                or enter delivery location
                            </Col>
                            <Col sm={5}>
                            <FormControl
                                className="location-input"
                                type="text"
                                value={props.locValue}
                                onChange={props.onChange}
                                name="location"
                                placeholder="delivery location (address, city, state)"
                            />
                        </Col>
                        </Row>
                    </div>}
            />
            </Row>
        </FormGroup> 


        <FormGroup controlId="formControlsSelect">
            <Row>
            <Col sm={2} componentClass={ControlLabel} className="business">
            Choose a business
            </Col>
            <Col sm={5}>
                <FormControl 
                className="bus-select"
                onChange={props.onChange}
                name="business"
                componentClass="select" placeholder="select">
                    <option value="">Select</option>
                    <option value="starbucks">Starbucks</option>
                    <option value="walgreens">Walgreens</option>
                    <option value="chipotle">Chipotle</option>
                </FormControl>
            </Col>
            </Row>
        </FormGroup>

        <FormGroup>
            <Row>
            <Col sm={2} componentClass={ControlLabel} className="request">
            Request 
            </Col>
            <Col sm={5} className="req-input">
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
    </Grid>
  </div>;

export default WishForm;