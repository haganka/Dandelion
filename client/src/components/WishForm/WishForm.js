import React from "react";
import { Form, FormGroup, Col, FormControl, ControlLabel, Button } from 'react-bootstrap';


const WishForm = props =>

    <div className="wish-box">
    <Form>
        <FormGroup>
            <Col sm={2}>
            Business Name
            </Col>
            <Col componentClass={ControlLabel} sm={10}>
            <FormControl
                type="text"
                value={props.busValue}
                onChange={props.onChange}
                name="business"
                placeholder="Business name"
            />
            </Col>
        </FormGroup>

        <FormGroup>
            <Col sm={2}>
            Your Location 
            </Col>
            <Col componentClass={ControlLabel} sm={10}>
            <FormControl
                type="text"
                value={props.locValue}
                onChange={props.onChange}
                name="location"
                placeholder="your location"
            />
            </Col>
        </FormGroup>

        <FormGroup>
            <Col sm={2}>
            Request 
            </Col>
            <Col componentClass={ControlLabel} sm={10}>
            <FormControl
                type="text"
                value={props.reqValue}
                onChange={props.onChange}
                name="request"
                placeholder="your request"
            />
            </Col>
        </FormGroup>
        <Button
            onClick={props.onSubmit}
            disabled={!(props.busValue && props.locValue && props.reqValue)}
            >Wish
        </Button>
    </Form>
  </div>;

export default WishForm;