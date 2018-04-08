import React from "react";
import "./CompletePanel.css";
import { Row, Grid, Panel } from 'react-bootstrap';


const CompletePanel = props => 
<Grid>
  <Row>
        <Panel className="completed-box">
          <Panel.Heading></Panel.Heading>
          <Panel.Body>
            <p>Request: {props.request}</p>
            <p>Location: {props.location}</p>
            {props.wish ? <p>Granted By: {props.grantedBy}</p> : 
            <p> Granted For: {props.grantedFor}</p>}
          </Panel.Body>
        </Panel>
  </Row>
</Grid>
;

export default CompletePanel;