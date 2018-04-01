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
            redirectTo: "",
            isLoggedIn: false,
            fireId: null,
            grant: false,
            wish: false,
            submitSuccess: false
        };

        this.toggleLogIn = this.toggleLogIn.bind(this);
        this.toggleSignUp = this.toggleSignUp.bind(this);
        this.logInSubmit = this.logInSubmit.bind(this);
        this.signUpSubmit = this.signUpSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }


    signUpSubmit = (email, password) => {
        // console.log("sign up clicked!")
        // event.preventDefault();
        auth.createUserWithEmailAndPassword(email, password)
        .catch(err => console.error(err));
        this.setState({
            email: this.state.email,
            password: this.state.password,
            submitSuccess: true
        })
        // if (this.state.email && this.state.password && this.state.name) {
            API.saveUser({
                name: this.state.name,
                email: this.state.email,
                password: this.state.password,
                rating: []
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
        // this.setState({
        //     email: this.state.email,
        //     password: this.state.password
        // })
        API.checkUser({
            email: this.state.email
        })
        .then(res => {console.log(res.data._id); this.setState({id: res.data._id, name: res.data.name});})
        // .then(window.location = ('/home'))
        .catch(err => console.log(err));
    };

    // logout = () => {
    //     auth.signOut().then(function() {
    //         this.setState({isLoggedIn: false, email: "", name: "", password: "", id: ""})
    //       }).catch(function(error) {
    //     });
    // }


    handleInputChange = (event) => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
        console.log(this.state)
    };

    toggleLogIn() {
        this.setState({
            name: "", email: "", password: ""
          })
        this.setState({
            login: !this.state.login
        })
        if(this.state.signup === true){
            this.setState({ signup: false});
        }
    }

    toggleSignUp() {
        this.setState({
            name: "", email: "", password: ""
          })
        this.setState({
            signup: !this.state.signup
        })
        if(this.state.login === true){
            this.setState({ login: false});
        }
    }


  toggleWish() {
    // this.setState({
    //   business: "", location: "", request: "", range: ""
    // })
    this.setState({
      wish: !this.state.wish
    })
    if (this.state.grant === true) {
      this.setState({
        grant: false
      })
    }
  }

  toggleGrant() {
    // this.setState({
    //   business: "", location: "", request: "", range: ""
    // })
    this.setState({
      grant: !this.state.grant
    })
    if (this.state.wish === true) {
      this.setState({
        wish: false
      })
    }
  }

  componentDidMount = () => {
    this.authListener();
  };

  authListener = () => {
    auth.onAuthStateChanged((user) => {
        if (user) {
            this.setState({
                email: user.email,
                fireId: user.uid
            })
        } else {
        console.log("user signed out");
        }

    });
    }

    render() {
        return (
            <div>
            {!this.state.submitSuccess ? 
            <Grid fluid>
                {this.state.isLoggedIn ? <Button onClick={this.logout}>Logout</Button> : null}
                <Row>
                    <Col md={12}>
                        <Jumbotron>
                            Hi there, welcome to Wish. Wish allows every day people to make a wish or grant a wish of another. If you're stuck in class and in desperate need of a coffee or don't have time to run out and grab lunch, just make a wish! If you're stopping at the grocery store on the way home or swinging by your favorite coffee shop on the way in to work, offer to grant a wish! By matching and accepting each other, you're making wishes come true. Log in or sign up to get started!
                        </Jumbotron>
                    </Col>
                </Row>
                <Row>
                    <Col sm={12} className="login-box">
                    <button className="login-btns" onClick={this.toggleLogIn.bind(this)}>Log in</button>
                    <button className="login-btns" onClick={this.toggleSignUp.bind(this)}>Sign up</button>
                    </Col>
                </Row>
                <Row>
                    <Col>
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
                    </Col>
                </Row>
            </Grid> : 
             <Home userId={this.state.id} 
                name={this.state.name} 
                isLoggedIn={this.state.isLoggedIn} 
                wishClick={this.toggleWish.bind(this)} 
                grantClick={this.toggleGrant.bind(this)}
                wish={this.state.wish}
                grant={this.state.grant}/>}
            </div>
        );
    }
}


export default Login;