import React from "react";
import "./ReqBox.css";
import { Link } from "react-router-dom";
import { Col, Row, Form, Button, Jumbotron, Grid, Panel } from 'react-bootstrap';

const ReqBox = props => 

  <Row>
    <Col sm={10}>
        <Panel>
          <Panel.Heading>{props.name}</Panel.Heading>
          <Panel.Body>
            <p>Location: {props.location}</p>
            <p>Request: {props.request}</p>
            {/* {props.snapshot} ? <Button>Accept request from</Button> */}
          </Panel.Body>
        </Panel>
    </Col>
  </Row>


export default ReqBox;