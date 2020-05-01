import React, { useState } from "react";

import "./App.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Map from "./pages/Map";
import Profile from "./pages/Profile";
import { Route } from "react-router-dom";

const App = () => {

  return (
    <div className="App">
      <Route exact path="/" component={Login} />
      <Route path="/login" component={Login} />
      <Route path="/map" component={Map} />
      <Route path="/profile" component={Profile} />
      <Route path="/register" component={Register} />
    </div>
  );
};

export default App;
