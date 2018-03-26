import React, { Component } from "react";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Button, Jumbotron, Grid } from 'react-bootstrap';
import WishForm from "../../components/WishForm";
import GrantForm from "../../components/GrantForm";
import './Home.css';
import firebase from '../../fire.js';
import { geolocated } from 'react-geolocated';


class Home extends Component {
  //allows access to props if you pass down, allows console logging
  constructor(props) {
    //allows ability to set state if you want to
    super(props);

    this.state = {
      userInfo: "", //need to add email or id in order to link mongo info (rating, name) to firebase info (delivery location)
      grant: true,
      wish: false,
      business: "",
      location: "",
      lat: 0,
      long: 0,
      request: "",
      range: "",
      wishes: [],
      grants: [],
      matches: []
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

 
  handleInputChange = event => {
    console.log("running")
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
    console.log(this.state)
  };

  handleWishSubmit = () => {
    if (this.state.business && this.state.location && this.state.request) {
      let allWishes = this.state.wishes;
      const newWish = {
        business: this.state.business,
        location: this.state.location,
        lat: this.state.lat,
        long: this.state.long,
        request: this.state.request
      };
      allWishes.push(newWish);
      this.setState({wishes: allWishes})
      firebase.database().ref(newWish.business + '/' + "wishes")
      .push(newWish);
      this.findGrantMatch();
      }
    }

    getDistance = (lat1, lon1, lat2, lon2) => {
      console.log("lat1", lat1);
      console.log("lon1", lon1);
      console.log("lat2", lat2);
      console.log("lon2", lon2);
        var p = 0.017453292519943295;    // Math.PI / 180
        var c = Math.cos;
        var a = 0.5 - c((lat2 - lat1) * p)/2 + 
                c(lat1 * p) * c(lat2 * p) * 
                (1 - c((lon2 - lon1) * p))/2;
      
        var km = 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
        var miles = km * 0.62137;
        console.log("miles", miles);
      return miles;
    }

    findGrantMatch = () => {
      console.log("running find grant match")
      firebase.database().ref(this.state.business + '/grants').on('value', grant => {
        const allGrants = grant.val();
        const matches = Object.keys(allGrants).filter(e => this.getDistance(this.state.lat, this.state.long, allGrants[e].lat, allGrants[e].long) <= allGrants[e].range)
          console.log("match", matches)
      }); 
    }

    findWishMatch = () => {
      console.log("running find wish match")
      firebase.database().ref(this.state.business + '/wishes').on('value', wish => {
        
        const allWishes = wish.val();
        console.log("allWishes", allWishes);
        const matches = Object.keys(allWishes).filter(e => this.getDistance(this.state.lat, this.state.long, allWishes[e].lat, allWishes[e].long) <= this.state.range)
        console.log("matches", matches);
      }); 
    }


  handleGrantSubmit = () => {
    if (this.state.business && this.state.location && this.state.range) {
      console.log("saving grant data")
        let allGrants = this.state.grants;
        const newGrant = {
          business: this.state.business,
          location: this.state.location,
          lat: this.state.lat,
          long: this.state.long,
          range: this.state.range
        };
        allGrants.push(newGrant);
        this.setState({grants: allGrants})
        firebase.database().ref(newGrant.business + '/' + "grants")
        .push(newGrant);
        }
    this.findWishMatch();
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

getLatLng = (event) => {
  event.preventDefault();
  let address = this.state.location;
  let queryAddress = address.split(' ').join('+');
  console.log("address", queryAddress);
    API.getLocation(queryAddress)
      .then(res => {
        if(res.status === "ZERO_RESULTS"){
          console.log("bad address input")
      }else{
          let lat = res.data.results[0].geometry.location.lat;
          let long = res.data.results[0].geometry.location.lng;

          this.setState({
            lat: lat,
            long: long
          }) 
      }if(this.state.wish){
        this.handleWishSubmit()
      }else if(this.state.grant){
        this.handleGrantSubmit()
        console.log("running grant handler")
      }
    }); 
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
                busSelect={this.state.businessOptions}
                busValue={this.state.business}
                locValue={this.state.location}
                reqValue={this.state.request}
                getLocation={this.getCurrentPosition}
                onChange={this.handleInputChange.bind(this)}
                onSubmit={this.getLatLng}
              /> : <GrantForm
                type="text"
                busValue={this.state.business}
                locValue={this.state.location}
                rangeValue={this.state.range}
                onChange={this.handleInputChange.bind(this)}
                onSubmit={this.getLatLng}
              />}
          </Col>
        </Row>
        <Row>
          <Col sm={12}>
                <div id="map"></div>
          </Col>
          </Row>
      </Grid>
    );
  }
}


export default Home;