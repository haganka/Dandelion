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
import {fire, auth} from '../../fire.js';
import MatchModal from '../../components/MatchModal';

class Grant extends Component {
  //allows access to props if you pass down, allows console logging
  constructor(props) {
    //allows ability to set state if you want to
    super(props);

    this.state = {
      grant: this.props.grant,
      email: "",
      id: this.props.userId,
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
      viewPotential: false,
      viewOutgoingReq: false,
      viewIncomingReq: false,
      viewFinal: false,
      matched: false,
      finalMatches: [],
      completeMatch: {key: "", id: "", name: "", location: "", request: ""},
      markedComplete: false,
      rating: 0,
      accountPast: [],
      showModal: false,
      noResults: false,
      showTabs: false
    };

    this.handleInputChange = this.handleInputChange.bind(this);
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

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
    console.log(this.state)
    console.dir(event.target)
  };

  handleRadioChange = value => {
    console.log("rating val", value)
    this.setState({
      rating: value
    });
    console.log(this.state)
  }

  
  getMatchedUserInfo = (arr) => {
    console.log("id of match", arr)
    let finalMatches = [];
    for (let i = 0; i < arr.length; i++) {
      console.log("made it to for loop", arr[i].userId);
      API.getUserId(arr[i].userId)
          .then(res => {
          (res.data.fire = arr[i].fireKey);
          (res.data.location = arr[i].location);
          (res.data.request = arr[i].request);
          console.log(res.data);
          finalMatches.push(res.data);
          this.setState({
            matches: finalMatches,
            hasMatched: true,
            grant: false,
            showTabs: true
          });
          console.log(this.state.matches)
        })
        .catch(err => console.log(err));
    }
  }

  getDistance = (lat1, lon1, lat2, lon2) => {
    var p = 0.017453292519943295;   
    var c = Math.cos;
    var a = 0.5 - c((lat2 - lat1) * p) / 2 +
      c(lat1 * p) * c(lat2 * p) *
      (1 - c((lon2 - lon1) * p)) / 2;
    var km = 12742 * Math.asin(Math.sqrt(a));
    var miles = km * 0.62137;
    console.log("miles", miles);
    return miles;
  }

  getWishMatches = (matches) => {
    console.log("get wish matches running", matches);
    let wishArr = [];
    let time = Date.now();
    console.log("time", time)
    for (let i = 0; i < matches.length; i++) {
      firebase.database().ref(this.state.business + '/wishes/' + matches[i]).on('value', wish => {
        if(wish.val()){
          let diff = (time - wish.val().created)/1000/60;
          console.log("time", time, "allwishes time", wish.val().created, "diff", diff)
          if(diff >= 10){
            let key = wish.val().fireKey
            this.removeEntry(key);
            console.log("wish thats overdue", wish.val())
          }else{
            if(!this.state.clickedKey){
              const allWishes = wish.val();
              if(allWishes){
                wishArr.push(allWishes)
                console.log("all wishes", wishArr)
                this.setState({noResults: false})
                this.getMatchedUserInfo(wishArr)
              }else{
                this.setState({noResults: true})
              }
            }
          }
        }
      })
    }
}

  findWishMatch = () => {
    console.log("running find wish match")
    if(this.state.clickedKey === ""){
    firebase.database().ref(this.state.business + '/wishes').on('value', wish => {
      const allWishes = wish.val();
      if (allWishes) {
        const matches = Object.keys(allWishes).filter(e => this.getDistance(this.state.lat, this.state.long, allWishes[e].lat, allWishes[e].long) <= this.state.range)
        if(matches.length <= 0){
          this.setState({noResults: true})
        }else{this.getWishMatches(matches);}
      }else{ this.setState({noResults: true}) }
    })
  }else{console.log("THIS ALREADY EXISTS"); this.setState({noResults: true})}

  }

  handleGrantSubmit = () => {
    let time = Date.now();
    if (this.state.business && this.state.location && this.state.range) {
      console.log("saving grant data", this.state)
      let allGrants = this.state.grants;
      const newGrant = {
        userId: this.state.id,
        business: this.state.business,
        location: this.state.location,
        lat: this.state.lat,
        long: this.state.long,
        range: this.state.range,
        created: time,
        requested: false,
        requests: {name: "", location:"", request: "", id:"", key:"", complete: false},
        completed: false,
        fireKey: ""
      };
      allGrants.push(newGrant);
      this.setState({ grants: allGrants, showTabs: false })
      let newEntry = firebase.database().ref(newGrant.business + '/grants').push(newGrant);
      let key = newEntry.key
      this.setState({
        fireKey: key,
        clickedKey: "",
        noResults: false
      })
      console.log("LOOK AT ME", this.state)
      console.log("this is the new grant", newGrant)
      firebase.database().ref(newGrant.business + '/grants/' + key)
      .update({ fireKey: key });
    }
    this.findWishMatch();
    this.listenForRequest();
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
        } else {
          console.log("bad address input, try again")
        }
          this.handleGrantSubmit()
          console.log("running grant handler")
      });
  }

  removeEntry = (key) => {
    console.log("key to remove", key)
      firebase.database().ref(this.state.business + '/wishes/' + key).remove();
      let allFinal = this.state.finalMatches;
      let allReceived = this.state.wishReceived;
      let allSent = this.state.grantSent;
      let allMatches = this.state.matches;
      let newFinal = allFinal.filter(e => e.key !== key)
      let newReceived = allReceived.filter(e => e.key !== key)
      let newSent = allSent.filter(e => e.key !== key)
      let newMatches = allMatches.filter(e => e.fire !== key)
      this.setState({
        matches: newMatches,
        wishReceived: newReceived,
        grantSent: newSent,
        finalMatches: newFinal,
        completeMatch: {key: "", id: "", name: "", location: "", request: ""},
        matched: false
      })
      console.log(this.state)
  }

    markComplete = (id, key, name, location, request, rating) => {
          let completeKey = key;
          // let allComplete = this.state.completeMatch;
          let newComplete = {key: key, id: id, name: name, location: location, request: request};
          // allComplete.push(newComplete)
          this.setState({
            completeMatch: newComplete,
            markedComplete: true
          })
          let complete = {name: this.state.name, location: this.state.location, id: this.state.id, key: this.state.fireKey}
          console.log("completed passing to FB", complete, "complete key", completeKey)
           firebase.database().ref(this.state.business + '/wishes/' + completeKey + '/requests/')
          .update({complete: true});
    };
    

    handleSelect = (id, key, name, location, request, rating) => {
        console.log("the id of button clicked", id, "key", key)
        let allRequests = this.state.grantSent;
        let newReq = {name: name, location: location, id: id, request: request, key: key};
        allRequests.push(newReq)
        this.setState({clickedKey: key, grantSent: allRequests}, 
            () => this.updateUserSelected())
            this.keyMatchReq(newReq)
  
    }

    handleAccept = (id, key, name, location, request, rating) => {
      console.log("the id of accept clicked", id, "key", key, "name", name, "loc", location)
      let allRequests = this.state.grantSent;
      let newReq = {name: name, location: location, id: id, request: request, key: key};
      console.log(newReq)
      allRequests.push(newReq)
      this.setState({clickedKey: key, grantSent: allRequests}, 
          () => this.updateUserSelected())
          this.reqMatchKey(newReq);
          console.log(this.state.grantSent)
    }

    handleRatingSubmit = (id, key, name, location, request) => {
      console.log("id", id, "key", key, "name", name, "location", location, "request", request)
      console.log("complete matches in state", this.state.completeMatch)  
      API.getUserId(id)
        .then(res => {
        let ratingArr = res.data.ratingArr;
        let newRating = this.state.rating;
        let dataRating;
        let completeWishes = res.data.completeWishes;
        let newWish = {grantedBy: this.state.name, location: location, request: request, location: location, id: id, key: key}
        completeWishes.push(newWish);
        ratingArr.push(newRating)
        if(res.data.rating === 0){
          dataRating = newRating;
        }else{
          dataRating = ratingArr.reduce((a,b) => a + b, 0)/ratingArr.length;
          dataRating = dataRating.toString().split(".").map((el,i)=>i?el.split("").slice(0,2).join(""):el).join(".");
        }
          // let userRating = this.state.rating
          API.updateUser(id, {ratingArr: ratingArr, rating: dataRating, completeWishes: completeWishes})
              .then(res => {
              console.log(res.data)
        })
      .catch(err => console.log(err));
      })
      this.removeEntry(key);
    } 

    updateUserSelected = () => {
        console.log("handle select", this.state.grantSent)
        console.log("clicked key on state", this.state.clickedKey)
        let match = {name: this.state.name, location: this.state.location, id: this.state.id, key: this.state.fireKey, complete: false}
        console.log("match passing to FB", match)
        let ref = firebase.database().ref(this.state.business + '/wishes/' + this.state.clickedKey)
        ref.once('value', snapshot => {
          if(snapshot.val()){
            ref.update({requests: match, requested: true});
          }else{console.log("this no longer exists")}
        })
    };
    
    updateWishesReceivedState = (received) => {
        this.setState({
          wishReceived: received
        })
        console.log("state after request comes through", this.state.wishReceived)
    }
      
      
    listenForRequest = () => {
        console.log("LISTEN FOR RE RUNNING", this.state.fireKey)
        firebase.database().ref(this.state.business + '/grants/' + this.state.fireKey + '/requests').on('value', snapshot => {
        console.log("snapshot", snapshot.val())
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
            this.updateWishesReceivedState(allWishesReceived)
            this.reqMatchKey(newWish);
            }
        });
    }

      listenForComplete = () => {
        console.log("LISTEN FOR Complete", this.state.finalMatches)
        let finalMatches = this.state.finalMatches;
        let matchesMade = finalMatches.map(e => (e.id))
        console.log("final match ids to listen for complete", matchesMade);
        for(let i = 0; i < matchesMade.length; i++){
          firebase.database().ref(this.state.business + '/grants/' + matchesMade[i] + '/requests').on('value', snapshot => {
            console.log("snapshot", snapshot.val()); 
          if(snapshot.val() === null || snapshot.val().complete === false){
              console.log("nothing to snap");
          }else{
              let newComplete = {name: snapshot.val().name, 
                  location: snapshot.val().location, 
                  id: snapshot.val().id, 
                  key: snapshot.val().key,
                  request: snapshot.val().request };
              this.setState({
                completeMatch: newComplete,
                markedComplete: true
              })
              console.log("new complete", newComplete)
          }
        })
      }
    };

    handleCloseModal = () => {
      this.setState({ showModal: false });
    }
  
    handleShowModal = () => {
      this.setState({ showModal: true });
      console.log("where modal is true", this.state.showModal)
    }
    

    reqMatchKey = (req) => {
      console.log("find req match running", req);
      // for(let j = 0; j < this.state.finalMatches.length; j++){
      //   if(req.key !== this.state.finalMatches[j].key){
        for(let i = 0; i < this.state.grantSent.length; i++){
            if(req.key === this.state.grantSent[i].key){
                // alert("it's a match!", this.state.grantSent[i])
                let newMatch = this.state.finalMatches;
                newMatch.push(req)
                this.setState({
                    matched: true,
                    finalMatches: newMatch,
                })
            this.handleShowModal();
            this.listenForComplete();
            }
        }
    }

    keyMatchReq = (req) => {
      console.log("find req match running", req);
        for(let i = 0; i < this.state.wishReceived.length; i++){
            if(req.key === this.state.wishReceived[i].key){
                let newMatch = this.state.finalMatches;
                newMatch.push(req)
                this.setState({
                    matched: true,
                    finalMatches: newMatch
                })
                this.handleShowModal();
            }
        }
    }


    toggleViewPotential = () => {
      this.setState({
          viewPotential: true,
          hasMatched: false,
          viewOutgoingReq: false,
          viewIncomingReq: false,
          viewFinal: false,
          grant: false,
          noResults: false
        })
        console.log(this.state)
  }

    toggleViewOutgoing = () => {
        this.setState({
            viewOutgoingReq: true,
            hasMatched: false,
            viewIncomingReq: false,
            viewFinal: false,
            viewPotential: false,
            grant: false,
            noResults: false
          })
          console.log(this.state)
    }

    toggleViewIncoming = () => {
        this.setState({
            viewIncomingReq: true,
            hasMatched: false,
            viewOutgoingReq: false,
            viewPotential: false,
            viewFinal: false,
            grant: false,
            noResults: false
          })
          console.log(this.state)
    }

    toggleViewFinal = () => {
        if(this.state.showModal === true){
          this.setState({
            showModal: false,
          })
          this.setState({
            viewFinal: true,
            viewOutgoingReq: false,
            viewIncomingReq: false,
            hasMatched: false,
            viewPotential: false,
            grant: false,
            noResults: false
          })
        }
          console.log(this.state)
    }


  render() {
    return (
      <div>
        <Grid fluid>
          <Row>
                {this.state.grant ? <GrantForm
                    type="text"
                    busValue={this.state.business}
                    locValue={this.state.location}
                    rangeValue={this.state.range}
                    onChange={this.handleInputChange.bind(this)}
                    onSubmit={this.getLatLng}
                /> : null}
          </Row>
        </Grid>
        {this.state.showTabs ? 
        <Grid>
            <Row className="match-row">
              <Col xs={5} sm={3}>
                <Button className="match-btns potential-match" onClick={this.toggleViewPotential}>POTENTIAL MATCHES</Button>
                </Col>
                <Col xs={5} xsOffset={1} sm={3}>
                <Button className="match-btns out-match" onClick={this.toggleViewOutgoing}>OUTGOING REQUESTS</Button>
                </Col>
                <Col xs={5} sm={3}>
                <Button className="match-btns in-match" onClick={this.toggleViewIncoming}>INCOMING REQUESTS</Button>
                </Col>
                {this.state.matched ? <Col xs={5} xsOffset={1} sm={3}><Button className="match-btns final-match" onClick={this.toggleViewFinal}>VIEW MY MATCHES</Button></Col> : null}
            </Row>
        </Grid> : null}
        {this.state.noResults ? <Row> Sorry, there aren't any wishes nearby to match your grant at the moment. Try again soon!</Row> : null}

        {this.state.hasMatched  ? <MatchContainer grant={true} match={true} outgoing={false} incoming={false} matches={this.state.matches} onClick={this.handleSelect}/>
          : null}
        {this.state.viewPotential ? <MatchContainer grant={true} match={true} outgoing={false} incoming={false} matches={this.state.matches} onClick={this.handleSelect}/>
          : null}
        {this.state.viewOutgoingReq ? <MatchContainer grant={true} match={false} outgoing={true} incoming={false} matches={this.state.grantSent} /> : null}

        {this.state.viewIncomingReq ? <MatchContainer grant={true} match={false} outgoing={false} incoming={true} matches={this.state.wishReceived} onClick={this.handleAccept}/> : null}
      
        {this.state.viewFinal ? <MatchContainer grant={true} rating={this.state.rating} finalMatch={true} complete={this.state.markedComplete} matches={this.state.finalMatches} markComplete={this.markComplete} onChange={this.handleRadioChange} ratingSubmit={this.handleRatingSubmit}/> : null}
      
        {this.state.showModal ? <MatchModal show={this.handleShowModal} close={this.handleCloseModal} viewMatches={this.toggleViewFinal}/> : null}

      
      </div>
    );
  }
}


export default Grant;