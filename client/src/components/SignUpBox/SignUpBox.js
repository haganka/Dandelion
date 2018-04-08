import React from "react";
import { Form, FormGroup, Grid, FormControl, Col, Row, Button } from 'react-bootstrap';
import './SignUpBox.css';
const SignUpBox = props =>
<div className="signup">
  <Grid>
  <Form id='signup-box'>
    <Row>
    <FormGroup>
      <div className="name">
        Name
      </div>
      <div>
        <FormControl
          type="text"
          value={props.nameValue}
          onChange={props.onChange}
          name="name"
          placeholder="Enter name"
        />
      </div>
    </FormGroup>
    </Row>

    <Row>
    <FormGroup>
      <div className="email">
        Email
      </div>
      <div>
      <FormControl
          type="email"
          value={props.emailValue}
          onChange={props.onChange}
          name="email"
          placeholder="Enter Email"
        />  
      </div>
    </FormGroup>
    </Row>

    <Row>
    <FormGroup>
      <div className="password">
        Password
      </div>
      <div>
        <FormControl
          type="password"
          value={props.passValue}
          onChange={props.onChange}
          name="password"
          placeholder="Enter password"
        />
      </div>
    </FormGroup>
    </Row>

    <Row>
    <Col xs={12} className="signup-btn-box">
    <Button
      className="signup-submit" onClick={()=>props.onSubmit(props.emailValue, props.passValue)}
      disabled={!(props.emailValue && props.passValue)}
      >Submit
    </Button>
    </Col>
    </Row>
  </Form>
  </Grid>
</div>

export default SignUpBox;