import React, { Component } from "react";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import MatchBox from '../MatchBox';
import { Col, Row } from 'react-bootstrap';

const MatchContainer = props =>
             <div>
                 <Row>
                    <Col sm={6}>
                    {props.matches ? 
                    props.matches.map((match => <MatchBox
                        header={props.button}
                        name={match.name}
                        rating={match.rating}
                        location={match.location}
                        request={match.request}
                        id={match._id} 
                        key={match.fire}
                        fire={match.fire} 
                        cb={props.onClick}
                        grant={props.grant}
                        match={props.match}
                        incoming={props.incoming}
                        outgoing={props.outgoing}
                        wish={props.wish}
                        />)) : null}
                    
                    {/* {props.incoming ?
                    props.matches.map((match => <MatchBox
                        header="Incoming Requests"
                        name={match.name}
                        rating={match.rating}
                        location={match.location}
                        id={match.id} 
                        key={match.fire}
                        fireKey={match.fire} 
                        cb={props.onClick}
                        grant={props.grant}
                        wish={props.wish}
                        matches={props.matches}
                        incoming={props.incoming}
                        />)) : null}

                    {props.outgoing ?
                    props.matches.map((match => <MatchBox
                        header="Outgoing Requests"
                        name={match.name}
                        rating={match.rating}
                        location={match.location}
                        request={match.request}
                        id={match.id} 
                        key={match.fire}
                        fireKey={match.fire} 
                        cb={props.onClick}
                        grant={props.grant}
                        matches={props.matches}
                        wish={props.wish}
                        outgoing={props.outgoing}
                        />)) : null} */}
                    </Col>
                </Row>
            </div>



export default MatchContainer;