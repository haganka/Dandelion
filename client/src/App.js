import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
// import About from "./pages/About";
// import Account from "./pages/Account";
// import NoMatch from "./pages/NoMatch";
import NavBar from "./components/NavBar";

const App = () =>
  <Router>
    <div>
      <NavBar />
      <Switch>
        <Route exact path="/" component={Home} />
        {/* <Route exact path="/about" component={About} /> */}
        {/* <Route exact path="/account" component={Account} /> */}
        {/* <Route component={NoMatch} /> */}
      </Switch>
    </div>
  </Router>;

export default App;