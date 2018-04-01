import React from "react";
import "./MatchBox.css";
import { Link } from "react-router-dom";
import { Col, Row, Form, Button, Radio, FormGroup, FormControl, Jumbotron, Grid, Panel } from 'react-bootstrap';


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
            
            {props.grant && props.match ? 
            <Button onClick={()=>props.cb(props.id, props.fire, props.name, props.location, props.request)}>Choose {props.name}!</Button> : null}
            
            {props.wish && props.match ? 
            <Button onClick={()=>props.cb(props.id, props.fire, props.name, props.location)}>Choose {props.name}!</Button> : null}
            
            {props.incoming && props.grant ? 
            <Button onClick={()=>props.cb(props.matchId, props.finalKey, props.name, props.location, props.request)}>Accept {props.name}!</Button> : null}

            {props.incoming && props.wish ? 
            <Button onClick={()=>props.cb(props.matchId, props.finalKey, props.name, props.location)}>Accept {props.name}!</Button> : null}

            {props.grant && props.readyForComplete ? 
            <Button onClick={()=>props.complete(props.matchId, props.finalKey, props.name, props.location, props.request)}>Mark completed</Button> : null}  
            
            {props.wish && props.readyForComplete && !props.markedComplete ? 
            <Button onClick={()=>props.complete(props.matchId, props.finalKey, props.name, props.location)}>Mark completed</Button> : null} 
          
            {props.markedComplete ? 
            <Form>Please rate your experience with {props.name}
                  {/* <FormControl
                    type="radio"
                    value={props.ratingValue}
                    onChange={props.onChange}
                  /> */}
                <FormGroup>
                <Radio name="radioGroup" value={1}  onChange={()=>props.onChange(1)}>
                  1
                </Radio>{' '}
                <Radio name="radioGroup" value={2}  onChange={()=>props.onChange(2)}>
                  2
                </Radio>{' '}
                <Radio name="radioGroup" value={3} onChange={()=>props.onChange(3)}>
                  3
                </Radio>
                <Radio name="radioGroup" value={4}  onChange={()=>props.onChange(4)}>
                  4
                </Radio>
                <Radio name="radioGroup" value={5}  onChange={()=>props.onChange(5)}>
                  5
                </Radio>
                {props.wish ? 
                <Button onClick={()=>props.ratingSubmit(props.matchId, props.finalKey, props.name, props.location)}>Submit Rating</Button> : null}
                {props.grant ? 
                <Button onClick={()=>props.ratingSubmit(props.matchId, props.finalKey, props.name, props.location, props.request)}>Submit Rating</Button> : null}
              </FormGroup>
            </Form>: null}
          </Panel.Body>
        </Panel>
    </Col>
  </Row>
</Grid>
;

export default MatchBox;