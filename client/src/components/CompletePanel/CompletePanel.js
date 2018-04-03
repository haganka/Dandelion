import React from "react";
import "./CompletePanel.css";
import { Link } from "react-router-dom";
import { Col, Row, Form, Button, Radio, FormGroup, FormControl, Jumbotron, Grid, Panel } from 'react-bootstrap';


const CompletePanel = props => 
<Grid>
  <Row>
    {/* <Col sm={10}> */}
        <Panel className="completed-box">
          <Panel.Heading></Panel.Heading>
          <Panel.Body>
            <p>Request: {props.request}</p>
            <p>Location: {props.location}</p>
            {props.wish ? <p>Granted By: {props.grantedBy}</p> : 
            <p> Granted For: {props.grantedFor}</p>}
          </Panel.Body>
        </Panel>
    {/* </Col> */}
  </Row>
</Grid>
;

export default CompletePanel;