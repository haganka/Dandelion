import React from "react";
import "./MatchBox.css";
import { Link } from "react-router-dom";
import { Col, Row, Form, Button, Jumbotron, Grid, Panel } from 'react-bootstrap';


const MatchBox = props => 
<Grid>
  <Row>
    <Col sm={12}>{props.header}</Col>
  </Row>
  <Row>
    <Col sm={10}>
        <Panel>
          <Panel.Heading>{props.name}</Panel.Heading>
          <Panel.Body>
            <h5>Rating: {props.rating}</h5>
            <p>Location: {props.location}</p>
            {props.grant ? <p>Request: {props.request}</p> : null}
            {props.wish && props.match ? 
            <Button onClick={()=>props.cb(props.fire, props.name, props.location)}>Choose {props.name}!</Button> : null}
          
            {props.grant && props.match ? 
            <Button onClick={()=>props.cb(props.fire, props.name, props.location, props.request)}>Choose {props.name}!</Button> : null}
          </Panel.Body>
        </Panel>
    </Col>
  </Row>
</Grid>
;

export default MatchBox;