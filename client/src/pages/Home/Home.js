import React, { Component } from "react";
import API from "../../utils/API";
import { Link, push } from "react-router-dom";
import { Col, Row, Button, Jumbotron, Grid } from 'react-bootstrap';
import WishForm from "../../components/WishForm";
import GrantForm from "../../components/GrantForm";
import './Home.css';
import firebase from '../../fire.js';
import { geolocated } from 'react-geolocated';
import MatchBox from '../../components/MatchBox';


class Home extends Component {
  //allows access to props if you pass down, allows console logging
  constructor(props) {
    //allows ability to set state if you want to
    super(props);

    this.state = {
      userInfo: "5ab969f63b6ee4536affa213", //need to add email or id in order to link mongo info (rating, name) to firebase info (delivery location)
      grant: false,
      wish: false,
      business: "",
      location: "",
      lat: "",
      long: "",
      request: "",
      range: "",
      wishes: [],
      grants: [],
      matches: [],
      hasMatched: false
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  // componentDidMount() {
  //   this.userInfo();
  // }

  //temporary until user authentication working
  // userInfo = () => {
  //   API.getUser()
  //     .then(res => {
  //     console.log(res)
  //       this.setState({
  //         userInfo: res.data[0]._id
  //       })
  //     })
  //     .catch(err => console.log(err));
  // };

  // componentDidMount = () => {
  //   console.log(this.props)
  //   this.setState({
  //     userInfo: this.props.userId
  //   })
  // }


  handleInputChange = event => {
    console.log("running")
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
    console.log(this.state)
  };


  getMatchedUserInfo = (arr) => {
    console.log("id of match", arr)
    let finalMatches = [];
    for(let i = 0; i < arr.length; i++){
      API.getUserId(arr[i].userId) 
      .then(res => {
        (res.data.location = arr[i].location); 
        console.log(res.data); 
        finalMatches.push(res.data);
          this.setState({
          matches: finalMatches,
          hasMatched: true
          });
        console.log(this.state.matches)
      })
        
      .catch(err => console.log(err));

    }
  }


  getDistance = (lat1, lon1, lat2, lon2) => {
    console.log("lat 1", lat1)
    console.log("lon 1", lon1)
    console.log("lat 2", lat2)
    console.log("long 1", lon2)
    var p = 0.017453292519943295;    // Math.PI / 180
    var c = Math.cos;
    var a = 0.5 - c((lat2 - lat1) * p) / 2 +
      c(lat1 * p) * c(lat2 * p) *
      (1 - c((lon2 - lon1) * p)) / 2;

    var km = 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
    var miles = km * 0.62137;
    console.log("miles", miles);
    return miles;
  }

  getGrantMatches = (matches) => {
    console.log("get matches running");
    let grantArr = [];
    for(let i = 0; i < matches.length; i++){
      firebase.database().ref(this.state.business + '/grants/' + matches[i]).on('value', grant => {
        const allGrants = grant.val();
        grantArr.push(allGrants)
      }) 
      console.log("grant array", grantArr)
      this.getMatchedUserInfo(grantArr)       
    }
  }

  findGrantMatch = () => {
    console.log("running find grant match")
    firebase.database().ref(this.state.business + '/grants').on('value', grant => {
      const allGrants = grant.val();
      if(allGrants){
        const matches = Object.keys(allGrants).filter(e => this.getDistance(this.state.lat, this.state.long, allGrants[e].lat, allGrants[e].long) <= allGrants[e].range)
        console.log("matches", matches)
        this.getGrantMatches(matches);
      }else{console.log("no matches")}
    });
  }

  getWishMatches = (matches) => {
    console.log("get wish matches running");
    let wishArr = [];
    for(let i = 0; i < matches.length; i++){
      firebase.database().ref(this.state.business + '/wishes/' + matches[i]).on('value', wish => {
        const allWishes = wish.val();
        console.log("all final wish matches for grant", allWishes)
        wishArr.push(allWishes)
      })
      this.getMatchedUserInfo(wishArr) 
    }
  }

  findWishMatch = () => {
    console.log("running find wish match")
    firebase.database().ref(this.state.business + '/wishes').on('value', wish => {
      const allWishes = wish.val();
      console.log("wishes", allWishes)
      if(allWishes){
        const matches = Object.keys(allWishes).filter(e => this.getDistance(this.state.lat, this.state.long, allWishes[e].lat, allWishes[e].long) <= this.state.range)
        console.log("matches", matches);
      // return matches;
        this.getWishMatches(matches);
      }else{console.log("no matches")}
    })

  }

  //currently adds a userId from seeded db data, will become the user id for logged in person once authentication working
  handleWishSubmit = () => {
    if (this.state.business && this.state.location && this.state.request) {
      let allWishes = this.state.wishes;
      const newWish = {
        userId: this.state.userInfo,
        business: this.state.business,
        location: this.state.location,
        lat: this.state.lat,
        long: this.state.long,
        request: this.state.request
      };
      allWishes.push(newWish);
      this.setState({ wishes: allWishes })
      firebase.database().ref(newWish.business + '/wishes')
        .push(newWish);
      this.findGrantMatch();
    }
  }


  handleGrantSubmit = () => {
    if (this.state.business && this.state.location && this.state.range) {
      console.log("saving grant data")
      let allGrants = this.state.grants;
      const newGrant = {
        userId: this.state.userInfo,
        business: this.state.business,
        location: this.state.location,
        lat: this.state.lat,
        long: this.state.long,
        range: this.state.range
      };
      allGrants.push(newGrant);
      this.setState({ grants: allGrants })
      firebase.database().ref(newGrant.business + '/grants')
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
    if (this.state.grant === true) {
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
    if (this.state.wish === true) {
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
        if (res.status === "OK" || res.status !== "ZERO_RESULTS") {
          let lat = res.data.results[0].geometry.location.lat;
          let long = res.data.results[0].geometry.location.lng;

          this.setState({
            lat: lat,
            long: long
          })
        }else{
          console.log("bad address input, try again") 
        } if (this.state.wish) {
          this.handleWishSubmit()
        } else if (this.state.grant) {
          this.handleGrantSubmit()
          console.log("running grant handler")
        }
      });
  }

  render() {
    return (
      <div>

      {!this.state.hasMatched ?
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
            /> : null}
            {this.state.grant ? <GrantForm
              type="text"
              busValue={this.state.business}
              locValue={this.state.location}
              rangeValue={this.state.range}
              onChange={this.handleInputChange.bind(this)}
              onSubmit={this.getLatLng}
            /> : null}
          </Col>
        </Row>
        </Grid>
        : null} 
        {this.state.hasMatched ?                
        this.state.matches.map((match => <MatchBox
                    name={match.name}
                    rating={match.rating}
                    location={match.location}
                    // id={match._id} 
                    // key={match._id} 
                    />)) : null}

      </div>
    );
  }
}


export default Home;