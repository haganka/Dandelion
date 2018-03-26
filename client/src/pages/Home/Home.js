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
      request: "",
      range: "",
      wishes: [],
      grants: []
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
        request: this.state.request
      };
      allWishes.push(newWish);
      this.setState({wishes: allWishes})
      firebase.database().ref(newWish.business + '/' + "wishes")
      .push(newWish);
        // this.setState({
        //   message: ''
        // });
      // findGrantMatch();
      }
    }

    // findGrantMatch = () => {
      
    // }

      // firebase.database().ref(this.state.business + '/drivers').on('value', driver => {
      //   const allDrivers = driver.val();
      //   if (allDrivers != null) {
      //     this.setState({
      //       matches: allDrivers
      //     });
      //   }
      // });
 

  handleGrantSubmit = () => {
    if (this.state.business && this.state.location && this.state.range) {
        let allGrants = this.state.grants;
        const newGrant = {
          business: this.state.business,
          location: this.state.location,
          request: this.state.range
        };
        allGrants.push(newGrant);
        this.setState({grants: allGrants})
        firebase.database().ref(newGrant.business + '/' + "grants")
        .push(newGrant);
          // this.setState({
          //   message: ''
          // });
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
          let latLong = res.data.results[0].geometry.location.lat + '/' + res.data.results[0].geometry.location.lng;

          this.setState({
            location: latLong
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