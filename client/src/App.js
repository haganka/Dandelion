import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import './App.css';

const App = () =>
  <Router>
    <div className="container">
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/user" component={Login} />
        <Route exact path="/logout" component={Login} />
         <Route exact path="/user/home" component={Home} /> 
      </Switch>
    </div>
  </Router>;

export default App;