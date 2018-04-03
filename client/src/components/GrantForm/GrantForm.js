import React from "react";
import { Form, FormGroup, Col, Row, FormControl, ControlLabel, Button } from 'react-bootstrap';
import './GrantForm.css';

const GrantForm = props =>
    
    <div className="grant-box">
    <Form>
        <Row>
            <FormGroup>
                <div className="business-grant">
                Business Name
                </div>
                {/* <Col sm={8}> */}
                <FormControl 
                    onChange={props.onChange}
                    name="business"
                    componentClass="select" placeholder="select">
                        <option value="">Select</option>
                        <option value="starbucks">Starbucks</option>
                        <option value="walgreens">Walgreens</option>
                        <option value="chipotle">Chipotle</option>
                </FormControl>
                {/* </Col> */}
            </FormGroup>
        </Row>
    <Row>
        <FormGroup>
            <div className="location">
            Business Location 
            </div>
            {/* <Col componentClass={ControlLabel} sm={10}> */}
            <FormControl
                type="text"
                value={props.locValue}
                onChange={props.onChange}
                name="location"
                placeholder="business location"
            />
            {/* </Col> */}
        </FormGroup>
    </Row>
    <Row>
        <FormGroup>
            <div className="range">
            Range 
            </div>
            {/* <Col componentClass={ControlLabel} sm={10}> */}
            <FormControl
                type="text"
                value={props.rangeValue}
                onChange={props.onChange}
                name="range"
                placeholder="desired delivery range (i.e. 0.5 miles, 1 mile, 5 miles)"
            />
            {/* </Col> */}
        </FormGroup>
    </Row>
    <Row>
        <Col sm={12}>
        <Button
            className="grant-submit"
            onClick={props.onSubmit}
            disabled={!(props.busValue && props.locValue && props.rangeValue)}
            >Grant
        </Button>
        </Col>
    </Row>
</Form>
</div>;

export default GrantForm;