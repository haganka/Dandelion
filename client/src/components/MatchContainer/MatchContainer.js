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
                        header="Requests"
                        name={match.name}
                        rating={match.rating}
                        location={match.location}
                        id={match._id} 
                        key={match.fire}
                        fireKey={match.fire} 
                        cb={props.onClick}
                        />)) : null}
                    
                    {props.incoming ?
                    props.matches.map((match => <MatchBox
                        header="Incoming Requests"
                        name={match.name}
                        rating={match.rating}
                        location={match.location}
                        id={match.id} 
                        key={match.fire}
                        fireKey={match.fire} 
                        cb={props.onClick}
                        incoming={true}
                        />)) : null}

                    {props.incoming ?
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
                        wish={true}
                        outgoing={true}
                        />)) : null}
                    </Col>
                </Row>
            </div>



export default MatchContainer;