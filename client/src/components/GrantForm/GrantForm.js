import React from "react";
import { Form, FormGroup, Col, Row, FormControl, ControlLabel, Button } from 'react-bootstrap';
import './GrantForm.css';

const GrantForm = props =>
    
    <div className="grant-box">
    <Form>
        <Row>
        <FormGroup>
            <div className="location">
            Business Location 
            </div>
                <FormControl
                type="text"
                value={props.locValue}
                onChange={props.onChange}
                name="location"
                placeholder="business location"
                />
        </FormGroup>
        </Row>
        <Row>
            <FormGroup>
                <div className="business-grant">
                Choose a Business
                </div>
                <FormControl 
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
            </FormGroup>
        </Row>
        <Row>
            <div className="range">
            Range 
            </div>

        <FormControl 
            onChange={props.onChange}
            name="range"
            componentClass="select" placeholder="select">
                <option value="">Select</option>
                <option value=".5">1/2 mile</option>
                <option value="1">1 mile</option>
                <option value="5">5 miles</option>
        </FormControl>
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