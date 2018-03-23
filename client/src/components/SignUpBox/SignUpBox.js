import React from "react";
import { Form, FormGroup, FormControl, Col, Row, Button, ControlLabel } from 'react-bootstrap';

const SignUpBox = props =>
<div className="signup">
    <FormGroup>
      <Col sm={2}>
        Name
      </Col>
      <Col componentClass={ControlLabel} sm={10}>
        <FormControl
          type="text"
          value={props.nameValue}
          onChange={props.onChangeSign}
          name="signName"
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
          value={props.emailValueSign}
          onChange={props.onChangeSign}
          name="signEmail"
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
          value={props.passValueSign}
          onChange={props.onChangeSign}
          name="signPassword"
          placeholder="Enter password"
        />
      </Col>
    </FormGroup>

    <Button
      onClick={props.onSubmitSign}
      disabled={!(props.emailValueSign && props.passValueSign)}
      >Sign Up
    </Button>
</div>

export default SignUpBox;