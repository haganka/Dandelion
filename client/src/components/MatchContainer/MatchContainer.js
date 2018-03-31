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
                        matchId={match.id}
                        key={match.key}
                        fire={match.fire} 
                        cb={props.onClick}
                        grant={props.grant}
                        match={props.match}
                        incoming={props.incoming}
                        outgoing={props.outgoing}
                        wish={props.wish}
                        />)) : null}
                    
                    </Col>
                </Row>
            </div>



export default MatchContainer;