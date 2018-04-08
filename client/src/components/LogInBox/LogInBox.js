import React from "react";
import './LogInBox.css';
import { Form, FormGroup, Grid, FormControl, Col, Row, Button } from 'react-bootstrap';

const LogInBox = props => 

  <div className="login">
  <Grid>
    <Form id="login-box">
    <Row>
    <FormGroup>
      <div id="email">
        Email
      </div>
      <div >
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
      <div id="password">
        Password
      </div>
      <div >
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
      <Col xs={12} className="login-btn-box">
      <Button
        className="login-submit" onClick={()=>props.onSubmit(props.emailValue, props.passValue)}
        disabled={!(props.emailValue && props.passValue)}
        >Submit
      </Button>
    </Col>
    </Row>
    </Form>
    </Grid>
  </div>;



export default LogInBox;