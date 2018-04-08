import React, { Component, ReactDOM } from "react";
import API from "../../utils/API";
// import { Link, push } from "react-router-dom";
import { Col, Row, Grid, Button } from 'react-bootstrap';
import WishForm from "../../components/WishForm";
import './Wish.css';
import firebase from '../../fire.js';
// import { geolocated } from 'react-geolocated';
import MatchContainer from '../../components/MatchContainer';
import moment from 'moment';
import {fire, auth} from '../../fire.js';
import MatchModal from '../../components/MatchModal';


class Wish extends Component {
  //allows access to props if you pass down, allows console logging
  constructor(props) {
    //allows ability to set state if you want to
    super(props);

    this.state = {
      wish: this.props.wish,
      id: this.props.userId,
      email: "", //need to add email or id in order to link mongo info (rating, name) to firebase info (delivery location)
      name: this.props.name,
      isLoggedIn: true,
      business: "",
      location: "",
      lat: "",
      long: "",
      request: "",
      wishes: [],
      matches: [],
      hasMatched: false,
      fireKey: "",
      clickedKey: "",
      grantReceived: [],
      wishSent: [],
      viewPotential: false,
      viewOutgoingReq: false,
      viewIncomingReq: false,
      matched: false,
      finalMatches: [],
      completeMatch: {key: "", id: "", name: "", location: ""},
      markedComplete: false,
      rating: 0,
      showModal: false,
      noResults: false,
      currentTime: "",
      showTabs: false
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }


  componentDidMount = () => {
    let time = moment();
    let currentTime = moment()._d;
    this.setState({
      currentTime: currentTime
    })
    this.authListener();
  };

  authListener = () => {
    auth.onAuthStateChanged((user) => {
        if (user) {
            this.setState({
                email: user.email,
                isLoggedIn: true
            })
        }else{
          this.setState({
            isLoggedIn: false
        })
    }

  });
}


  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleRadioChange = value => {
    this.setState({
      rating: value
    });
  }

  
  getMatchedUserInfo = (arr) => {
    let finalMatches = [];
    for (let i = 0; i < arr.length; i++) {
      API.getUserId(arr[i].userId)
          .then(res => {
          (res.data.fire = arr[i].fireKey);
          (res.data.location = arr[i].location);
          finalMatches.push(res.data);
          this.setState({
            matches: finalMatches,
            hasMatched: true,
            wish: false,
            showTabs: true
          });
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
    return miles;
  }

  getGrantMatches = (matches) => {
    let grantArr = [];
    let time = Date.now();
    for (let i = 0; i < matches.length; i++) {
      firebase.database().ref(this.state.business + '/grants/' + matches[i]).on('value', grant => {
        if(grant.val()){
          let diff = (time - grant.val().created)/1000/60;
            if(diff >= 10){
                let key = grant.val().fireKey
                this.removeEntry(key);
            }else{
              if(!this.state.clickedKey){
                const allGrants = grant.val();
                if(allGrants){
                  grantArr.push(allGrants)
                  this.setState({noResults: false})
                }else{
                  this.setState({noResults: true})
                }
              }
            }
          }
        })
      }if(grantArr.length > 0){this.getMatchedUserInfo(grantArr);}
  }

  findGrantMatch = () => {
    firebase.database().ref(this.state.business + '/grants').on('value', grant => {
      if(!this.state.clickedKey){
        const allGrants = grant.val();
        if (allGrants) {
          const matches = Object.keys(allGrants).filter(e => this.getDistance(this.state.lat, this.state.long, allGrants[e].lat, allGrants[e].long) <= allGrants[e].range);
          if(matches.length <= 0){
           this.setState({noResults: true})
          }else{this.getGrantMatches(matches); }
        }else {this.setState({noResults: true})
        }
      }
     
    });
  }

  handleWishSubmit = () => {
    let time = Date.now();
    if (this.state.business && this.state.location && this.state.request) {
      let allWishes = this.state.wishes;
      const newWish = {
        userId: this.state.id,
        business: this.state.business,
        location: this.state.location,
        lat: this.state.lat,
        long: this.state.long,
        request: this.state.request,
        created: time,
        requested: false,
        requests: {name: "", location:"", id:"", key:"", complete: false},
        completed: false,
        fireKey: ""
      };
      allWishes.push(newWish);
      this.setState({ wishes: allWishes, showTabs: false })
      let newEntry = firebase.database().ref(newWish.business + '/wishes').push(newWish);
      let key = newEntry.key
      this.setState({
        fireKey: key,
        clickedKey: "",
        noResults: false
      })
      firebase.database().ref(newWish.business + '/wishes/' + key)
      .update({ fireKey: key });
      this.findGrantMatch();
      this.listenForRequest();
    }
  }



  getLatLng = (event) => {
    this.setState ({
      showTabs: true
    })
    event.preventDefault();
    let address = this.state.location;
    let queryAddress = address.split(' ').join('+');
    API.getLocation(queryAddress)
      .then(res => {
        if (res.status === "OK" || res.status !== "ZERO_RESULTS") {
          let lat = res.data.results[0].geometry.location.lat;
          let long = res.data.results[0].geometry.location.lng;

          this.setState({
            lat: lat,
            long: long
          })
        }
        this.handleWishSubmit()

      });
  }

  removeEntry = (key) => {
      firebase.database().ref(this.state.business + '/grants/' + key).remove();
      let allFinal = this.state.finalMatches;
      let allReceived = this.state.grantReceived;
      let allSent = this.state.wishSent;
      let allMatches = this.state.matches;
      let newFinal = allFinal.filter(e => e.key !== key)
      let newReceived = allReceived.filter(e => e.key !== key)
      let newSent = allSent.filter(e => e.key !== key)
      let newMatches = allMatches.filter(e => e.fire !== key)
      this.setState({
        matches: newMatches,
        grantReceived: newReceived,
        wishSent: newSent,
        finalMatches: newFinal,
        completeMatch: {key: "", id: "", name: "", location: ""} 
      })
  }

  markComplete = (id, key, name, location, rating) => {
    let newComplete = {key: key, id: id, name: name, location: location, rating: rating};
    this.setState({
      completeMatch: newComplete,
      markedComplete: true
    })
    let completeKey = key;
    let complete = {name: this.state.name, location: this.state.location, id: this.state.id, key: this.state.fireKey}
     firebase.database().ref(this.state.business + '/grants/' + completeKey + '/requests/')
    .update({complete: true});
  };

  handleSelect = (id, key, name, location, rating) => {
    let allRequests = this.state.wishSent;
    let newReq = {name: name, location: location, id: id, key: key, rating: rating};
    allRequests.push(newReq)
    this.setState({clickedKey: key, wishSent: allRequests}, 
        () => this.updateUserSelected())
        this.keyMatchReq(newReq);
  }

  handleAccept = (id, key, name, location, rating) => {
    let allRequests = this.state.wishSent;
    let newReq = {name: name, location: location, id: id, key: key, rating: rating};
    allRequests.push(newReq)
    this.setState({clickedKey: key, wishSent: allRequests}, 
        () => this.updateUserSelected())
        this.reqMatchKey(newReq);
  }

  handleRatingSubmit = (id, key, name, location) => {
      API.getUserId(id)
      .then(res => {
      let ratingArr = res.data.ratingArr;
      let newRating = this.state.rating;
      let dataRating;
      let completeGrants = res.data.completeGrants;
      let newGrant = {wishFrom: this.state.name, request: this.state.request, location: this.state.location, id: id, key: key}
      completeGrants.push(newGrant);
      ratingArr.push(newRating)
      if(res.data.rating === 0){
        dataRating = newRating;
      }else{
        dataRating = ratingArr.reduce((a,b) => a + b, 0)/ratingArr.length;
        dataRating = dataRating.toString().split(".").map((el,i)=>i?el.split("").slice(0,2).join(""):el).join(".");
      }
        API.updateUser(id, {ratingArr: ratingArr, rating: dataRating, completeGrants: completeGrants})
            .then(res => {
            console.log(res.data)
      })
    .catch(err => console.log(err));
    this.removeEntry(key);

    })
  } 
 

  updateUserSelected = () => {
    let match = {name: this.state.name, location: this.state.location, request: this.state.request, id: this.state.id, key: this.state.fireKey, complete: false}
    let ref = firebase.database().ref(this.state.business + '/grants/' + this.state.clickedKey)
    ref.once('value', snapshot => {
      if(snapshot.val()){
        ref.update({requests: match, requested: true});
      }
      })
    }
  


    updateGrantsReceivedState = (received) => {
        this.setState({
            grantReceived: received
        })
    }

    listenForRequest = () => {
        firebase.database().ref(this.state.business + '/wishes/' + this.state.fireKey + '/requests').on('value', snapshot => {
        if(snapshot.val() === null || snapshot.val().id === ""){
            console.log("nothing to snap");
        }else{
            let newGrant = {name: snapshot.val().name, 
                location: snapshot.val().location, 
                id: snapshot.val().id, 
                key: snapshot.val().key}
            let allGrantsReceived = this.state.grantReceived;
            allGrantsReceived.push(newGrant)
            this.updateGrantsReceivedState(allGrantsReceived);
            this.reqMatchKey(newGrant);
        }
    });
  }

  listenForComplete = () => {
    let finalMatches = this.state.finalMatches;
    let matchesMade = finalMatches.map(e => (e.id))
    for(let i = 0; i < matchesMade.length; i++){
      firebase.database().ref(this.state.business + '/wishes/' + matchesMade[i] + '/requests').on('value', snapshot => {
        if(snapshot.val() === null || snapshot.val().complete === false){
          console.log("nothing to snap");
        }else{
          let newComplete = {name: snapshot.val().name, 
              location: snapshot.val().location, 
              id: snapshot.val().id, 
              key: snapshot.val().key };
          this.setState({
            completeMatch: newComplete,
            markedComplete: true
          })
        }
      })
    }
  };


  handleCloseModal = () => {
    this.setState({ showModal: false });
  }

  handleShowModal = () => {
    this.setState({ showModal: true });
  }

  reqMatchKey = (req) => {
  // for(let j = 0; j < this.state.finalMatches.length; j++){
    // if(req.key !== this.state.finalMatches[j].key){
      for(let i = 0; i < this.state.wishSent.length; i++){
        if(req.key === this.state.wishSent[i].key){
            let newMatch = this.state.finalMatches;
            newMatch.push(req)
            this.setState({
              matched: true,
              finalMatches: newMatch
            })
            this.listenForComplete();
            this.handleShowModal();
        }
      }
    }

  keyMatchReq = (req) => {
    for(let i = 0; i < this.state.grantReceived.length; i++){
      if(req.key === this.state.grantReceived[i].key){
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
        wish: false,
        noResults: false
      })
  }

  toggleViewOutgoing = () => {
      this.setState({
          viewOutgoingReq: true,
          hasMatched: false,
          viewIncomingReq: false,
          viewFinal: false,
          viewPotential: false,
          wish: false,
          noResults: false
        })
  }

  toggleViewIncoming = () => {
      this.setState({
          viewIncomingReq: true,
          hasMatched: false,
          viewOutgoingReq: false,
          viewPotential: false,
          viewFinal: false,
          wish: false,
          noResults: false
        })
  }

  toggleViewFinal = () => {
    if(this.state.showModal === true){
      this.setState({
        showModal: false,
      })
    }
    this.setState({
        viewFinal: true,
        viewOutgoingReq: false,
        hasMatched: false,
        viewIncomingReq: false,
        viewPotential: false,
        wish: false,
        noResults: false
      })
  }

  render() {
    return (
      <div>
        <Grid fluid>
          <Row>
              {this.state.wish ? <WishForm
                type="text"
                busSelect={this.state.businessOptions}
                busValue={this.state.business}
                locValue={this.state.location}
                reqValue={this.state.request}
                getLocation={this.getCurrentPosition}
                onChange={this.handleInputChange.bind(this)}
                onSubmit={this.getLatLng}
                saveCurrentPosition={this.saveCurrentPosition}
              /> : null}
          </Row>
        </Grid>
        {this.state.showTabs ? 
        <Grid>
            <Row>
              <Col sm={3}>
                <Button className="potential-match match-btns" onClick={this.toggleViewPotential}>POTENTIAL MATCHES</Button>
                </Col>
              <Col sm={3}>
                <Button className="in-match match-btns" onClick={this.toggleViewOutgoing}>OUTGOING REQUESTS</Button>
              </Col>
              <Col sm={3}>
                <Button className="out-match match-btns" onClick={this.toggleViewIncoming}>INCOMING REQUESTS</Button>
              </Col>
                {this.state.matched ? <Col sm={3}><Button className="final-match match-btns"onClick={this.toggleViewFinal}>VIEW MY MATCHES</Button></Col> : null}
            </Row>
        </Grid> : null}
        {this.state.noResults ? <Row> Sorry, there aren't any grants to match your wish at the moment. Try again soon!</Row> : null}
        {this.state.hasMatched ? <MatchContainer wish={true} match={true} outgoing={false} incoming={false} matches={this.state.matches} onClick={this.handleSelect}></MatchContainer>
          : null}
        {this.state.viewOutgoingReq ? <MatchContainer wish={true} match={false} outgoing={true} incoming={false} matches={this.state.wishSent}></MatchContainer> : null}
        {this.state.viewPotential ? <MatchContainer wish={true} match={true} outgoing={false} incoming={false} matches={this.state.matches} onClick={this.handleSelect}/>
          : null}
        {this.state.viewIncomingReq ? <MatchContainer wish={true} match={false} outgoing={false} incoming={true} matches={this.state.grantReceived} onClick={this.handleAccept}></MatchContainer> : null}
        {this.state.viewFinal ? <MatchContainer wish={true} finalMatch={this.state.matched} complete={this.state.markedComplete} matches={this.state.finalMatches} markComplete={this.markComplete} onChange={this.handleRadioChange} rating={this.state.rating} ratingSubmit={this.handleRatingSubmit}/> : null}
        {this.state.showModal ? <MatchModal show={this.handleShowModal} close={this.handleCloseModal} viewMatches={this.toggleViewFinal}/> : null}
      
      </div>
    );
  }
}


export default Wish;