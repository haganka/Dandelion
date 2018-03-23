import React, { Component } from "react";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Form, FormControl, ControlLabel, FormGroup, Button, Jumbotron, Grid } from 'react-bootstrap';
import WishForm from "../../components/WishForm";
import GrantForm from "../../components/GrantForm";
// import LoginModal from "../../components/LoginModal";
import './Home.css';
// import Toggle from 'react-toggle-display';


class Home extends Component {
  //allows access to props if you pass down, allows console logging
  constructor(props) {
    //allows ability to set state if you want to
    super(props);

    this.state = {
      books: [],
      wish: {
        business: "",
        location: "",
        request: "",
        isHidden: false
      },
      grant: {
        business: "",
        location: "",
        range: "",
        isHidden: false
      }

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
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
    console.log(this.state)
  };

  // handleFormSubmit = event => {
  //   event.preventDefault();
  //   if (this.state.location && this.state.value) {
  //     API.saveBook({
  //       business: this.state.business,
  //       location: this.state.location,
  //       value: this.state.value,
  //       request: this.state.request
  //     })
  //       .then(res => this.loadBooks())
  //       .catch(err => console.log(err));
  //   }
  // };

  toggleWishHidden() {
    this.setState({
      wish: { isHidden: !this.state.wish.isHidden }
    })
  }

  toggleGrantHidden() {
    this.setState({
      grant: { isHidden: !this.state.grant.isHidden }
    })
  }

  render() {
    return (
      <Grid fluid>
        <Row>
          <Col md={6}>
            <Jumbotron>
              <button className="home-btns" onClick={this.toggleWishHidden.bind(this)}>Make a Wish</button>
            </Jumbotron>
            {!this.state.wish.isHidden && <WishForm >
              <FormGroup>
                <Col sm={2}>
                  Business Name
                </Col>
                <Col componentClass={ControlLabel} sm={10}>
                  <FormControl
                    type="text"
                    value={this.state.wish.business}
                    onChange={this.handleInputChange}
                    name="business"
                    placeholder="Business name (optional?)"
                  />
                </Col>
              </FormGroup>

              <FormGroup>
                <Col sm={2}>
                  Your Location
                </Col>
                <Col componentClass={ControlLabel} sm={10}>
                  <FormControl
                    type="text"
                    value={this.state.wish.location}
                    onChange={this.handleInputChange}
                    name="location"
                    placeholder="Enter your location address"
                  />
                </Col>
              </FormGroup>

              <FormGroup>
                <Col sm={2}>
                  Request
                </Col>
                <Col componentClass={ControlLabel} sm={10}>
                  <FormControl
                    type="text"
                    value={this.state.wish.request}
                    onChange={this.handleInputChange}
                    name="request"
                    placeholder="Request"
                  />
                  <Button
                    disabled={!(this.state.wish.location && this.state.wish.value)}
                  // onClick={this.handleFormSubmit}
                  >
                    Wish
              </Button>
                </Col>
              </FormGroup>
            </WishForm>}
          </Col>
          <Col md={6}>
            <Jumbotron>
              <button className="home-btns" onClick={this.toggleGrantHidden.bind(this)} >Grant a Wish</button>
            </Jumbotron>
            {!this.state.grant.isHidden && <GrantForm >
              <FormGroup>
                <Col sm={2}>
                  Business Name
              </Col>
                <Col componentClass={ControlLabel} sm={10}>
                  <FormControl
                    type="text"
                    value={this.state.grant.business}
                    onChange={this.handleInputChange}
                    name="business"
                    placeholder="Business name"
                  />
                </Col>
              </FormGroup>

              <FormGroup>
                <Col sm={2}>
                  Business Location
              </Col>
                <Col componentClass={ControlLabel} sm={10}>
                  <FormControl
                    type="text"
                    value={this.state.grant.location}
                    onChange={this.handleInputChange}
                    name="location"
                    placeholder="Enter the business address"
                  />
                </Col>
              </FormGroup>

              <FormGroup>
                <Col sm={2}>
                  Range
              </Col>
                <Col componentClass={ControlLabel} sm={10}>
                  <FormControl
                    type="text"
                    value={this.state.grant.range}
                    onChange={this.handleInputChange}
                    name="range"
                    placeholder="desired mile range (i.e. 0.5, 1, 1.2)"
                  />
                <Button
                disabled={!(this.state.grant.location && this.state.grantbusiness)}
                  >Grant
                </Button>
                </Col>
              </FormGroup>
            </GrantForm>}
          </Col>
        </Row>
      </Grid>
    );
  }
}


export default Home;