import React from "react";
import { Form, FormGroup, FormControl, Col, Row, Button, ControlLabel } from 'react-bootstrap';

const SignUpBox = props =>
<div className="signup">
  <Form>
    <FormGroup>
      <Col sm={2}>
        Name
      </Col>
      <Col componentClass={ControlLabel} sm={10}>
        <FormControl
          type="text"
          value={props.nameValue}
          onChange={props.onChange}
          name="name"
          placeholder="Enter name"
        />
      </Col>
    </FormGroup>
    
    <FormGroup>
      <Col sm={2}>
        Email
      </Col>
      <Col componentClass={ControlLabel} sm={10}>
      <FormControl
          type="email"
          value={props.emailValue}
          onChange={props.onChange}
          name="email"
          placeholder="Enter Email"
        />  
      </Col>
    </FormGroup>

    <FormGroup>
      <Col sm={2}>
        Password
      </Col>
      <Col componentClass={ControlLabel} sm={10}>
        <FormControl
          type="password"
          value={props.passValue}
          onChange={props.onChange}
          name="password"
          placeholder="Enter password"
        />
      </Col>
    </FormGroup>

    <Button
      onClick={()=>props.onSubmit(props.emailValue, props.passValue)}
      disabled={!(props.emailValue && props.passValue)}
      >Sign Up
    </Button>
  </Form>
</div>

export default SignUpBox;