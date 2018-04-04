import React, { Component } from "react";
import API from "../../utils/API";
import { Link, browserHistory } from "react-router-dom";
import { Col, Row, Form, Button, Jumbotron, Grid } from 'react-bootstrap';
import LogInBox from "../../components/LogInBox";
import SignUpBox from "../../components/SignUpBox";
import './Login.css';
import Wish from '../Wish';
import Grant from '../Grant';
import Home from '../Home';
import {fire, auth} from '../../fire.js';
import Account from '../Account';
import NavBar from "../../components/NavBar";
// import Footer from '../../components/Footer';

class Login extends Component {
    //allows access to props if you pass down, allows console logging
    constructor(props) {
        //allows ability to set state if you want to
        super(props);

        this.state = {
            login: false,
            signup: false,
            name: "",
            email: "",
            password: "",
            id: "",
            rating: 0,
            completedWishes: [],
            completedGrants: [],
            redirectTo: "",
            isLoggedIn: false,
            fireId: null,
            grant: false,
            wish: false,
            submitSuccess: false,
            viewAccount: false
        };

        this.toggleLogIn = this.toggleLogIn.bind(this);
        this.toggleSignUp = this.toggleSignUp.bind(this);
        this.logInSubmit = this.logInSubmit.bind(this);
        this.signUpSubmit = this.signUpSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }


    signUpSubmit = (email, password) => {
        auth.createUserWithEmailAndPassword(email, password)
        .catch(err => console.error(err));
        this.setState({
            email: this.state.email,
            password: this.state.password,
            submitSuccess: true
        })
            API.saveUser({
                name: this.state.name,
                email: this.state.email,
                password: this.state.password,
                ratingArr: [],
                rating: 0,
                completeGrants: [],
                completeWishes: []
            }).then(res => {console.log(res.data._id); this.setState({id: res.data._id});})
            .catch(err => console.log(err));
        // }
    };

    logInSubmit = (email, password) => {
        auth.signInWithEmailAndPassword(email, password)
        .then(user => {
          const { email, uid } = user;
          this.setState({
            isLoggedIn: true,
            email: email,
            fireId: uid,
            submitSuccess: true
          });
        })
        .catch(err => console.error(err));
        API.checkUser({
            email: this.state.email
        })
        .then(res => {console.log(res.data._id); 
            this.setState({
                id: res.data._id, 
                name: res.data.name,
                rating: res.data.rating,
                completedWishes: res.data.completeWishes,
                completedGrants: res.data.completeGrants
            });})
        .catch(err => console.log(err));
    };

    // logout = () => {
    //     auth.signOut().then(function() {
    //         this.setState({isLoggedIn: false, email: "", name: "", password: "", id: ""})
    //       }).catch(function(error) {
    //     });
    // }

    viewAccount = (event) => {
        event.preventDefault();
        API.checkUser({
            email: this.state.email
        })
        .then(res => { 
            this.setState({
                completedWishes: res.data.completeWishes,
                completedGrants: res.data.completeGrants
            });
        }).then(() =>
        this.setState({
            viewAccount: true
        }))
        console.log(this.state)
    }


    handleInputChange = (event) => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
        console.log(this.state)
    };

    toggleLogIn() {
        this.setState({
            name: "", email: "", password: "",
            login: true,
            signup: false
          })
    }

    toggleSignUp() {
        this.setState({
            name: "", email: "", password: "",
            signup: true,
            login: false
          })
    }


  toggleWish() {
    this.setState({
      wish: true,
      grant: false
    })
  }

  toggleGrant() {
    this.setState({
      grant: true,
      wish: false
    })
  }

  componentDidMount = () => {
      this.setState({
          viewAccount: false
      })
    this.authListener();
  };

  authListener = () => {
    auth.onAuthStateChanged((user) => {
        if (user) {
            this.setState({
                email: user.email,
                fireId: user.uid,
                isLoggedIn: true
            })
        } else {
        console.log("user signed out");
        }

    });
    }

    render() {
        return (
            <div className="container">
            {!this.state.submitSuccess ? 
            <div>
                <Grid>
                {/* {this.state.isLoggedIn ? <Button onClick={this.logout}>Logout</Button> : null} */}
                    <Row id="dand-box">
                        <div id="dandelion-head">
                        DANDELION
                        </div>
                    </Row>
                
                    <Row>
                    <Col md={12}>
                        <p className="intro">
                            Dandelion deliveries allow everyday people to make a wish or grant a wish of another. If you're in dire need of something, make a wish! If you're out and about and feeling generous, grant one! Dandelion is in the business of making wishes come true. Log in or sign up to get started!
                        </p>
                    </Col>
                </Row>
                <Row>
                    <Col sm={12} className="login-box">
                    <button className="login-btns" id="login-btn" onClick={this.toggleLogIn.bind(this)}>Log in</button>
                    <button className="login-btns" id="signup-btn" onClick={this.toggleSignUp.bind(this)}>Sign up</button>
                    </Col>
                </Row>
                <Row>
                    <div className="login-form-box">
                        {this.state.login ? <LogInBox
                            emailValue={this.state.email} 
                            passValue={this.state.password}
                            onChange={this.handleInputChange.bind(this)} 
                            onSubmit={this.logInSubmit.bind(this)}
                        /> : null}
                        {this.state.signup ? <SignUpBox 
                            nameValue={this.state.name} 
                            emailValue={this.state.email} 
                            passValue={this.state.password} 
                            onChange={this.handleInputChange.bind(this)} 
                            onSubmit={this.signUpSubmit.bind(this)}
                        />: null}
                    </div>
                </Row>
            </Grid> 
            </div> : 
            <div>
             <NavBar accountClick={this.viewAccount}/>
             <Home 
                wish={this.state.wish}
                grant={this.state.grant}
                userId={this.state.id} 
                name={this.state.name} 
                rating={this.state.rating}
                completedWishes={this.state.completedWishes}
                completedGrants={this.state.completedGrants}
                viewAccount={this.state.viewAccount}
                accountClick={this.viewAccount}
                isLoggedIn={this.state.isLoggedIn} 
                wishClick={this.toggleWish.bind(this)} 
                grantClick={this.toggleGrant.bind(this)}
                wish={this.state.wish}
                grant={this.state.grant}/>
            </div>}
            {/* <Footer/> */}
        </div>

        );
    }
}

export default Login;