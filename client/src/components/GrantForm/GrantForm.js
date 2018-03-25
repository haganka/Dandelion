import React from "react";
import { Form, FormGroup, Col, FormControl, ControlLabel, Button } from 'react-bootstrap';


const GrantForm = props =>
    
    <div className="grant-box">
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
            Business Location 
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
            Range 
            </Col>
            <Col componentClass={ControlLabel} sm={10}>
            <FormControl
                type="text"
                value={props.rangeValue}
                onChange={props.onChange}
                name="range"
                placeholder="desired delivery range (i.e. 0.5 miles, 1 mile, 5 miles)"
            />
            </Col>
        </FormGroup>
        <Button
            onClick={props.onSubmit}
            disabled={!(props.busValue && props.locValue && props.rangeValue)}
            >Grant
        </Button>
    </Form>
    </div>;

export default GrantForm;