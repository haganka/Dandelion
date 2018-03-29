import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Account from "./pages/Account";
// import NoMatch from "./pages/NoMatch";
import NavBar from "./components/NavBar";
import './App.css';

const App = () =>
  <Router>
    <div>
      <NavBar />
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/logout" component={Login} />
         <Route exact path="/home" component={Home} /> 
        {/* <Route exact path="/account" component={Account} /> */}
        {/* <Route component={NoMatch} /> */}
      </Switch>
    </div>
  </Router>;

export default App;