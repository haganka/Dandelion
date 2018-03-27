import React from "react";
import "./MatchBox.css";
import { Link } from "react-router-dom";
import { Col, Row, Form, Button, Jumbotron, Grid, Panel } from 'react-bootstrap';


const MatchBox = props => 

  <Row>
    <Col sm={10}>
        <Panel>
          <Panel.Heading>{props.name}</Panel.Heading>
          <Panel.Body>
            <h5>{props.rating}</h5>
            <h5>{props.location}</h5>
            <Button onClick={()=>props.onClick(props.id)}>Choose me!</Button>
          </Panel.Body>
        </Panel>
    </Col>
  </Row>
;

export default MatchBox;