import React, { Component, ReactDOM } from "react";
import API from "../../utils/API";
// import { Link, push } from "react-router-dom";
import { Col, Row, Grid, Button } from 'react-bootstrap';
import GrantForm from "../../components/GrantForm";
import './Grant.css';
import firebase from '../../fire.js';
// import { geolocated } from 'react-geolocated';
import MatchContainer from '../../components/MatchContainer';
import moment from 'moment';
import OutgoingContainer from '../../components/OutgoingContainer';
import IncomingContainer from '../../components/IncomingContainer';


class Grant extends Component {
  //allows access to props if you pass down, allows console logging
  constructor(props) {
    //allows ability to set state if you want to
    super(props);

    this.state = {
      userInfo: this.props.userId,
      isLoggedIn: this.props.isLoggedIn, //need to add email or id in order to link mongo info (rating, name) to firebase info (delivery location)
      name: this.props.name,
      business: "",
      location: "",
      lat: "",
      long: "",
      range: "",
      grants: [],
      matches: [],
      hasMatched: false,
      fireKey: "",
      clickedKey: "",
      requests: "",
      wishReceived: [],
      grantSent: [],
      viewOutgoingReq: false,
      viewIncomingReq: false
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }


  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
    console.log(this.state)
    console.dir(event.target)
  };

  
  getMatchedUserInfo = (arr) => {
    console.log("id of match", arr)
    let finalMatches = [];
    for (let i = 0; i < arr.length; i++) {
      console.log("made it to for loop", arr[i].userId);
      API.getUserId(arr[i].userId)
          .then(res => {(res.data.fire = arr[i].fireKey);
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

  getWishMatches = (matches) => {
    console.log("get wish matches running", matches);
    let wishArr = [];
    for (let i = 0; i < matches.length; i++) {
      firebase.database().ref(this.state.business + '/wishes/' + matches[i]).on('value', wish => {
        if(!this.state.clickedKey){
        const allWishes = wish.val();
        wishArr.push(allWishes)
        console.log("all wishes", wishArr)
        }
      })
      this.getMatchedUserInfo(wishArr)
    }
  }

  findWishMatch = () => {
    console.log("running find wish match")
    if(this.state.clickedKey === ""){
    firebase.database().ref(this.state.business + '/wishes').on('value', wish => {
      const allWishes = wish.val();
      if (allWishes) {
        const matches = Object.keys(allWishes).filter(e => this.getDistance(this.state.lat, this.state.long, allWishes[e].lat, allWishes[e].long) <= this.state.range)
        this.getWishMatches(matches);
      } else { console.log("no matches") }
    })}else{console.log("THIS ALREADY EXISTS")}

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
        range: this.state.range,
        created: Date.now(),
        requested: false,
        requests: {name: "", location:"", request: "", id:"", key:""},
        completed: false,
        fireKey: ""
      };
      allGrants.push(newGrant);
      this.setState({ grants: allGrants })
      let newEntry = firebase.database().ref(newGrant.business + '/grants').push(newGrant);
      let key = newEntry.key
      this.setState({
        fireKey: key
      })
      console.log("LOOK AT ME", this.state)
      firebase.database().ref(newGrant.business + '/grants/' + key)
      .update({ fireKey: key });
    }
    this.findWishMatch();
    this.listenForRequest();
  };

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
        } else {
          console.log("bad address input, try again")
        }
          this.handleGrantSubmit()
          console.log("running grant handler")
      });
  }

    handleSelect = (id, name, location, request) => {
        console.log("the id of button clicked", id)
        let allRequests = [];
        let newReq = {name: name, location: location, id: id, request: request};
        allRequests.push(newReq)
        this.setState({clickedKey: id, grantSent: allRequests}, 
            () => this.updateUserSelected())
    }

    updateUserSelected = () => {
        console.log("clicked key on state", this.state.clickedKey)
        let match = {name: this.state.name, location: this.state.location, id: this.state.userInfo, key:this.state.fireKey}
        console.log("match passing to FB", match)
         firebase.database().ref(this.state.business + '/wishes/' + this.state.clickedKey)
        .update({requests: match, requested: true});
    };
    

    listenForRequest = () => {
        console.log("LISTEN FOR RE RUNNING", this.state.fireKey)
        firebase.database().ref(this.state.business + '/grants/' + this.state.fireKey + '/requests').on('value', snapshot => {
        console.log("snapshot", snapshot.val());
        if(snapshot.val() === null || snapshot.val().id === ""){
            console.log("nothing to snap");
        }else{
            let newWish = {name: snapshot.val().name, 
                location: snapshot.val().location, 
                id: snapshot.val().id, 
                key: snapshot.val().key,
                request: snapshot.val().request };
                    let allWishesReceived = this.state.wishReceived;
                    allWishesReceived.push(newWish);
                    this.setState({
                    wishReceived: allWishesReceived
            })
            console.log("state after request comes through", this.state)
            }
        });
    }

    toggleViewOutgoing = () => {
        this.setState({
            viewOutgoingReq: !this.state.viewOutgoingReq
          })
          if (this.state.hasMatched === true) {
            this.setState({
              hasMatched: false
            })
          }
          if (this.state.viewIncoming === true) {
            this.setState({
              viewIncoming: false
            })
          }
          console.log(this.state)
    }

    toggleViewIncoming = () => {
        this.setState({
            viewIncomingReq: !this.state.viewIncomingReq
          })
          if (this.state.hasMatched === true) {
            this.setState({
              hasMatched: false
            })
          }
          if (this.state.viewOutgoing === true) {
            this.setState({
              viewOutgoing: false
            })
          }
          console.log(this.state)
    }


  render() {
    return (
      <div>
        <Grid fluid>
          <Row>
            <Col md={12}>
                <GrantForm
                    type="text"
                    busValue={this.state.business}
                    locValue={this.state.location}
                    rangeValue={this.state.range}
                    onChange={this.handleInputChange.bind(this)}
                    onSubmit={this.getLatLng}
                /> 
            </Col>
          </Row>
        </Grid>
        <Grid>
            <Row>
                <Col sm={3}>
                <Button onClick={this.toggleViewOutgoing}>View My Outgoing Requests</Button>
                </Col>
                <Col sm={3}>
                <Button onClick={this.toggleViewIncoming}>View My Incoming Requests</Button>
                </Col>
            </Row>
        </Grid>
        {this.state.hasMatched ? <MatchContainer matches={this.state.matches} onClick={this.handleSelect}/>
          : null}
        {this.state.viewOutgoingReq ? <MatchContainer matches={this.state.grantSent} /> : null}

        {this.state.viewIncomingReq ? <MatchContainer matches={this.state.wishReceived} /> : null}
      </div>
    );
  }
}


export default Grant;