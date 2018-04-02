import React, { Component, ReactDOM } from "react";
import API from "../../utils/API";
import { Link, push } from "react-router-dom";
import { Col, Row, Button, Jumbotron, Grid } from 'react-bootstrap';
import Wish from "../Wish";
import Grant from "../Grant";
import './Home.css';
import firebase from '../../fire.js';
import { geolocated } from 'react-geolocated';
// import MatchContainer from '../MatchContainer';


const Home = props =>
      <div>
        <Grid fluid>
          <Row>
            <Col sm={12}>{props.name}
            </Col>
          </Row>
          <Row>
            <Col md={6} className="home-btn-box">
              {/* <Jumbotron className="home-btn-box"> */}
                <button className="home-btn" onClick={props.wishClick}>Make a Wish</button>
              {/* </Jumbotron> */}
            </Col>
            <Col md={6} className="home-btn-box">
              {/* <Jumbotron className="home-btn-box"> */}
                <button className="home-btn" onClick={props.grantClick}>Grant a Wish</button>
              {/* </Jumbotron> */}
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              {props.wish ? <Wish
              userId={props.userId} 
              name={props.name} 
              isLoggedIn={props.isLoggedIn} 
              /> : null}
              {props.grant ? <Grant
              userId={props.userId} 
              name={props.name} 
              isLoggedIn={props.isLoggedIn} 
              /> : null}
            </Col>
          </Row>
        </Grid>
      </div>



export default Home;