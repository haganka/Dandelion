import React, { Component } from "react";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Button, Jumbotron, Grid } from 'react-bootstrap';
import WishForm from "../../components/WishForm";
import GrantForm from "../../components/GrantForm";
import './Home.css';
// import Toggle from 'react-toggle-display';


class Home extends Component {
  //allows access to props if you pass down, allows console logging
  constructor(props) {
    //allows ability to set state if you want to
    super(props);

    this.state = {
      userInfo: "", //need to add email or id in order to link mongo info (rating, name) to firebase info (delivery location)
      grant: false,
      wish: false,
      business: "",
      location: "",
      request: "",
      range: ""
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidMount() {
    this.userInfo();
  }

  userInfo = () => {
    API.getUser()
      .then(res =>
        console.log(res.data)
      )
      .catch(err => console.log(err));
  };

  // deleteBook = id => {
  //   API.deleteBook(id)
  //     .then(res => this.loadBooks())
  //     .catch(err => console.log(err));
  // };

  handleInputChange = event => {
    console.log("running")
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
    console.log(this.state)
  };

  handleWishSubmit = event => {
    event.preventDefault();
    if (this.state.business && this.state.location && this.state.request) {
      API.saveWish({
        business: this.state.business,
        location: this.state.location,
        request: this.state.request
      })
        .then(res => this.loadBooks())
        .catch(err => console.log(err));
    }else{
      console.log("please fill out all fields")
    }
  };

  handleGrantSubmit = event => {
    event.preventDefault();
    if (this.state.business && this.state.location && this.state.range) {
      API.saveGrant({
        business: this.state.business,
        location: this.state.location,
        range: this.state.request
      })
        .then(res => this.loadBooks())
        .catch(err => console.log(err));
    }else{
      console.log("please fill out all fields")
    }
  };

  toggleWish() {
    this.setState({
      business: "", location: "", request: "", range: ""
    })
    this.setState({
      wish: !this.state.wish
    })
    if(this.state.grant === true){
      this.setState({
        grant: false
      })
    }
  }

  toggleGrant() {
    this.setState({
      business: "", location: "", request: "", range: ""
    })
    this.setState({
      grant: !this.state.grant
    })
    if(this.state.wish === true){
      this.setState({
        wish: false
    })
  }
}


  render() {
    return (
      <Grid fluid>
        <Row>
          <Col md={6}>
            <Jumbotron>
              <button className="home-btns" onClick={this.toggleWish.bind(this)}>Make a Wish</button>
            </Jumbotron>
          </Col>
          <Col md={6}>
            <Jumbotron>
              <button className="home-btns" onClick={this.toggleGrant.bind(this)}>Grant a Wish</button>
            </Jumbotron>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
              {this.state.wish ? <WishForm              
                type="text"
                busValue={this.state.business}
                locValue={this.state.location}
                reqValue={this.state.request}
                onChange={this.handleInputChange.bind(this)}
                onSubmit={this.handleWishSubmit.bind(this)}
              /> : <GrantForm
                type="text"
                busValue={this.state.business}
                locValue={this.state.location}
                rangeValue={this.state.range}
                onChange={this.handleInputChange.bind(this)}
                onSubmit={this.handleGrantSubmit.bind(this)}
              />}
          </Col>
        </Row>
      </Grid>
    );
  }
}


export default Home;