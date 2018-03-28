import React from "react";
import { Form, FormGroup, Col, Row, FormControl, ControlLabel, Button } from 'react-bootstrap';


const GrantForm = props =>
    
    <div className="grant-box">
    <Form>
        <Row>
            <FormGroup>
                <Col sm={2}>
                Business Name
                </Col>
                <Col sm={8}>
                <FormControl 
                    onChange={props.onChange}
                    name="business"
                    componentClass="select" placeholder="select">
                        <option value="starbucks">Starbucks</option>
                        <option value="walgreens">Walgreens</option>
                        <option value="dominoes">Dominoes</option>
                </FormControl>
                </Col>
            </FormGroup>
        </Row>
    <Row>
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
                placeholder="business location"
            />
            </Col>
        </FormGroup>
    </Row>
    <Row>
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
    </Row>
    <Row>
        <Col sm={2}>
        <Button
            onClick={props.onSubmit}
            disabled={!(props.busValue && props.locValue && props.rangeValue)}
            >Grant
        </Button>
        </Col>
    </Row>
</Form>
</div>;

export default GrantForm;