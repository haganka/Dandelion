import React, { Component } from "react";
import API from "../../utils/API";
import { Link, browserHistory } from "react-router-dom";
import { Col, Row, Form, Button, Jumbotron, Grid } from 'react-bootstrap';
import LogInBox from "../../components/LogInBox";
import SignUpBox from "../../components/SignUpBox";
import './Login.css';
// import Toggle from 'react-toggle-display';
import Home from '../Home';

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
            isLoggedIn: false
        };

        this.toggleLogIn = this.toggleLogIn.bind(this);
        this.toggleSignUp = this.toggleSignUp.bind(this);
        this.logInSubmit = this.logInSubmit.bind(this);
        this.signUpSubmit = this.signUpSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }


    signUpSubmit = event => {
        console.log("sign up clicked!")
        event.preventDefault();
        this.setState({
            email: this.state.email,
            password: this.state.password
        })
        // if (this.state.email && this.state.password && this.state.name) {
            API.saveUser({
                name: this.state.name,
                email: this.state.email,
                password: this.state.password
            }).then(res => console.log(res))
            .catch(err => console.log(err));
        // }
    };

    logInSubmit = event => {
        console.log("clicked log in", this.state.email)
        event.preventDefault();
        this.setState({
            email: this.state.email,
            password: this.state.password
        })
        API.checkUser({
            email: this.state.email
        })
        .then(res => {console.log(res.data._id); this.setState({id: res.data._id});})
        // .then(window.location = ('/home'))
        .catch(err => console.log(err));
    };


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


    render() {
        return (
            <div>
            {!this.state.id ? <Grid fluid>
                <Row>
                    <Col md={12}>
                        <Jumbotron>
                            Hi there, welcome to Wish. Wish allows every day people to make a wish or grant a wish of another. If you're stuck in class and in desperate need of a coffee or don't have time to run out and grab lunch, just make a wish! If you're stopping at the grocery store on the way home or swinging by your favorite coffee shop on the way in to work, offer to grant a wish! By matching and accepting each other, you're making wishes come true. Log in or sign up to get started!
                        </Jumbotron>
                    </Col>
                </Row>
                <Row>
                    <button className="login-btns" onClick={this.toggleLogIn.bind(this)}>Log in</button>
                    <button className="login-btns" onClick={this.toggleSignUp.bind(this)}>Sign up</button>
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
            </Grid> : <Home userId={this.state.id} />}
            </div>
        );
    }
}


export default Login;