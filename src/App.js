import React from "react";

import "./App.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Map from "./pages/Map";
import Profile from "./pages/Profile";
import { Route, Switch } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
const App = () => {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/login" component={Login} />
        <PrivateRoute path="/map" component={Map} loginPath="/login" />
        <PrivateRoute path="/profile" component={Profile} loginPath="/login" />
        <Route path="/register" component={Register} />
      </Switch>
    </div>
  );
};

export default App;
