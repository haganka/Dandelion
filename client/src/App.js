import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Account from "./pages/Account";
// import NoMatch from "./pages/NoMatch";
import NavBar from "./components/NavBar";
import './App.css';
import Footer from './components/Footer';

const App = () =>
  <Router>
    <div className="container">
      {/* <NavBar /> */}
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/user" component={Login} />
        <Route exact path="/logout" component={Login} />
         <Route exact path="/user/home" component={Home} /> 
        {/* <Route exact path="/account" component={Account} /> */}
        {/* <Route component={NoMatch} /> */}
      </Switch>
      {/* <Footer/> */}
    </div>
  </Router>;

export default App;