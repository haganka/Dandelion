import React, { Component } from "react";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Form, Button, Jumbotron, Grid } from 'react-bootstrap';
import LogInBox from "../../components/LogInBox";
import SignUpBox from "../../components/SignUpBox";
import './Login.css';
// import Toggle from 'react-toggle-display';


class Login extends Component {
    //allows access to props if you pass down, allows console logging
    constructor(props) {
        //allows ability to set state if you want to
        super(props);

        this.state = {
            hideLogIn: true,
            hideSignUp: true,
            signName: "",
            signEmail: "",
            signPassword: "",
            logEmail: "",
            logPassword: ""
        };

        this.toggleLogIn = this.toggleLogIn.bind(this);
        this.toggleSignUp = this.toggleSignUp.bind(this);
        this.logInSubmit = this.logInSubmit.bind(this);
        this.signUpSubmit = this.signUpSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }


    signUpSubmit = event => {
        event.preventDefault();
        if (this.state.signEmail && this.state.signPassword && this.state.signName) {
            API.saveUser({
                name: this.state.signName,
                email: this.state.signEmail,
                password: this.state.signPassword
            })
                .then(res =>
                    console.log(res.data)
                )
                .catch(err => console.log(err));
        }
    };

    logInSubmit = event => {
        event.preventDefault();
        API.getUser()
            .then(res =>
                console.log(res.data)
            )
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
            hideLogIn: !this.state.hideLogIn
        })
        if(this.state.hideLogIn === false){
            this.setState({ hideSignup: true});
        }
    }

    toggleSignUp() {
        this.setState({
            hideSignUp: !this.state.hideSignUp
        })
        if(this.state.hideSignUp === false){
            this.setState({ hideLogIn: true});
        }
    }

    render() {
        return (
            <Grid fluid>
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
                    <Form>
                        {!this.state.hideLogIn && <LogInBox
                            emailValue={this.state.logEmail} 
                            passValue={this.state.logPassword} 
                            onChangeLog={this.handleInputChange.bind(this)} 
                            onSubmitLog={this.logInSubmit.bind(this)}
                        />}

                        {!this.state.hideSignUp && <SignUpBox 
                            nameValueSign={this.state.signName} 
                            emailValueSign={this.state.signEmail} 
                            passValueSign={this.state.signPassword} 
                            onChangeSign={this.handleInputChange.bind(this)} 
                            onSubmitSign={this.signUpSubmit.bind(this)}
                        />}

                    </Form>
                    </Col>
                </Row>
            </Grid>
        );
    }
}


export default Login;