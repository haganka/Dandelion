import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
// import Login from "./pages/Login";
// import Matches from "./pages/Matches";
// import Account from "./pages/Account";
// import NoMatch from "./pages/NoMatch";
import NavBar from "./components/NavBar";

const App = () =>
  <Router>
    <div>
      <NavBar />
      <Switch>
        <Route exact path="/" component={Home} />
        {/* <Route exact path="/" component={Login} /> */}
        {/* <Route exact path="/matches" component={Matches} /> */}
        {/* <Route exact path="/account" component={Account} /> */}
        {/* <Route component={NoMatch} /> */}
      </Switch>
    </div>
  </Router>;

export default App;