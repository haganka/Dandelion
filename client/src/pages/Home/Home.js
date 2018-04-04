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
import NavBar from '../../components/NavBar';
import Account from '../Account';

const Home = props =>
      <div>
          {props.isLoggedIn && props.viewAccount ? 
            <Account 
                userId={props.userId} 
                name={props.name} 
                rating={props.rating}
                isLoggedIn={props.isLoggedIn} 
                completedWishes={props.completedWishes}
                completedGrants={props.completedGrants}/> : 
        <Grid>
          <Row>
            <div className="welcome-name">Welcome, {props.name}
            </div>
          </Row>
          <Row>
            <div id="choose-btn">Would you like to make a wish or grant a wish?
            </div>
          </Row>
          <Row>
            <div className="home-btn-box">
                <button className="home-btn wish-btn" onClick={props.wishClick.bind()}>Make a Wish</button>
            </div>
            <div className="home-btn-box">
                <button className="home-btn grant-btn" onClick={props.grantClick.bind()}>Grant a Wish</button>
            </div>
          </Row>
          <Row>
            <Col md={12}>
              {props.wish ? <Wish
              wish={props.wish}
              userId={props.userId} 
              name={props.name} 
              isLoggedIn={props.isLoggedIn} 
              /> : null}
              {props.grant ? <Grant
              grant={props.grant}
              userId={props.userId} 
              name={props.name} 
              isLoggedIn={props.isLoggedIn} 
              /> : null}
            </Col>
          </Row> 
        </Grid> }

      </div>

export default Home;