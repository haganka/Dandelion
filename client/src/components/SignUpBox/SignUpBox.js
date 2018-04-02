import React from "react";
import { Form, FormGroup, FormControl, Col, Row, Button, ControlLabel } from 'react-bootstrap';
import './SignUpBox.css';
const SignUpBox = props =>
<div className="signup">
  <Form>
    <Row>
    <FormGroup>
      <Col sm={4} className="name">
        Name
      </Col>
      <Col componentClass={ControlLabel} sm={4}>
        <FormControl
          type="text"
          value={props.nameValue}
          onChange={props.onChange}
          name="name"
          placeholder="Enter name"
        />
      </Col>
    </FormGroup>
    </Row>

    <Row>
    <FormGroup>
      <Col sm={4} className="email">
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
      <Col sm={4} className="password">
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
    <Col sm={12} className="signup-btn-box">
    <Button
      className="signup-submit" onClick={()=>props.onSubmit(props.emailValue, props.passValue)}
      disabled={!(props.emailValue && props.passValue)}
      >Submit
    </Button>
    </Col>
    </Row>
  </Form>
</div>

export default SignUpBox;