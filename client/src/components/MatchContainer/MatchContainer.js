import React, { Component } from "react";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import MatchBox from '../MatchBox';
import { Col, Row } from 'react-bootstrap';

const MatchContainer = props =>
             <div>
                 <Row>
                    <Col sm={6}>
                    {props.wish ? <h1 className="match">Grant Results</h1> : <h1 className="match">Wish Results</h1>} 
                    
                    {props.matches.map((match => <MatchBox
                        name={match.name}
                        rating={match.rating}
                        location={match.location}
                        id={match._id} 
                        key={match.fire}
                        fireKey={match.fire} 
                        cb={props.onClick}
                        />))}
                    </Col>
                </Row>
            </div>



export default MatchContainer;