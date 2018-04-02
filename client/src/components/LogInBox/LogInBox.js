import React from "react";
import './LogInBox.css';
import { Form, FormGroup, FormControl, Col, Row, Button, ControlLabel } from 'react-bootstrap';

const LogInBox = props => 

  <div className="login">
    <Form>
    <Row>
    <FormGroup>
      <Col sm={4} id="email">
        Email
      </Col>
      <Col componentClass={ControlLabel} sm={4}>
      <FormControl
          type="email"
          value={props.emailValue}
          onChange={props.onChange}
          name="email"
          placeholder="Enter Email"
        />  
      </Col>
    </FormGroup>
    </Row>

    <Row>
    <FormGroup>
      <Col sm={4} id="password">
        Password
      </Col>
      <Col componentClass={ControlLabel} sm={4}>
        <FormControl
          type="password"
          value={props.passValue}
          onChange={props.onChange}
          name="password"
          placeholder="Enter password"
        />
      </Col>
    </FormGroup>
    </Row>
    <Row>
      <Col sm={12} className="login-btn-box">
      <Button
        className="login-submit" onClick={()=>props.onSubmit(props.emailValue, props.passValue)}
        disabled={!(props.emailValue && props.passValue)}
        >Submit
      </Button>
    </Col>
    </Row>
    </Form>
  </div>;



export default LogInBox;