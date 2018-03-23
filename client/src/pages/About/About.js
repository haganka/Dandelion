// import React, { Component } from "react";
// import { Link } from "react-router-dom";
// import { Col, Row, FormControl, FormGroup, Button, Jumbotron, Grid } from 'react-bootstrap';
// import WishForm from "../../components/WishForm";
// import GrantForm from "../../components/GrantForm";
// import LoginModal from "../../components/LoginModal";
// import './About.css';


// class About extends Component {

//   constructor(props) {
//     super(props);

//     this.state = {
//       books: [],
//       showLogin: false,
//       wish: {
//         business: "",
//         location: "",
//         value: 0,
//         request: "",
//         isHidden: false
//       },
//       grant: {
//         business: "",
//         location: "",
//         range: "",
//         isHidden: false
//       }

//     };

//     this.handleInputChange = this.handleInputChange.bind(this);
//   }


//   handleInputChange = event => {
//     const { name, value } = event.target;
//     this.setState({
//       [name]: value
//     });
//     console.log(this.state)
//   };


//   toggleWishHidden() {
//     this.setState({
//       wish: { isHidden: !this.state.wish.isHidden }
//     })
//   }

//   toggleGrantHidden() {
//     this.setState({
//       grant: { isHidden: !this.state.grant.isHidden }
//     })
//   }

//   render() {
//     return (
//       <Grid fluid>
//         <Row>
//           <Col md={6}>
//             <Jumbotron>
//               <button className="home-btns" onClick={this.toggleWishHidden.bind(this)}>Make a Wish</button>
//             </Jumbotron>
//             {!this.state.wish.isHidden && <WishForm >
//               <FormControl>
//                 Business Name
//               <FormGroup
//                   value={this.state.wish.business}
//                   onChange={this.handleInputChange}
//                   name="business"
//                   placeholder="Business name (optional?)"
//                 />
//                 Your Location
//                 <FormGroup
//                   value={this.state.wish.location}
//                   onChange={this.handleInputChange}
//                   name="location"
//                   placeholder="Enter your location address"
//                 />
//                 Value
//               <FormGroup
//                   value={this.state.wish.value}
//                   onChange={this.handleInputChange}
//                   name="value"
//                   placeholder="Value"
//                 />
//                 Request
//               <FormGroup
//                   type="text"
//                   value={this.state.wish.request}
//                   onChange={this.handleInputChange}
//                   name="request"
//                   placeholder="Request"
//                 />
//                 <Button
//                   disabled={!(this.state.wish.location && this.state.wish.value)}
//                 >
//                   Wish
//               </Button>
//               </FormControl>
//             </WishForm>}
//           </Col>
//           <Col md={6}>
//             <Jumbotron>
//               <button className="home-btns" onClick={this.toggleGrantHidden.bind(this)} >Grant a Wish</button>
//             </Jumbotron>
//             {!this.state.grant.isHidden && <GrantForm >
//               <FormControl>
//                 Business Name
//             <FormGroup
//                   value={this.state.grant.business}
//                   onChange={this.handleInputChange}
//                   name="business"
//                   placeholder="Business name"
//                 />
//                 Business Location
//             <FormGroup
//                   value={this.state.grant.location}
//                   onChange={this.handleInputChange}
//                   name="location"
//                   placeholder="Enter full business address"
//                 />
//                 Range
//               <FormGroup
//                   value={this.state.grant.location}
//                   onChange={this.handleInputChange}
//                   name="range"
//                   placeholder="desired mile range (i.e. 0.5, 1, 1.2)"
//                 />
//                 <Button
//                   disabled={!(this.state.grant.location && this.state.grantbusiness)}
//                 >Grant
//                 </Button>
//               </FormControl>
//             </GrantForm>}
//           </Col>
//         </Row>
//       </Grid>
//     );
//   }
// }


// export default About;
