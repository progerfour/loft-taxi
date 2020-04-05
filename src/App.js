import React, { Component } from "react";


import "./App.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Map from "./pages/Map";

const pagesMap = {
  map:  Map,
  profile: Map,
  exit:  Login,
  login: Login,
  register: Register,
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { currentPage: "login" };
  }

  changeCurrentPage = (newPage) => {
    this.setState({ currentPage: newPage });
  };

  render() {
    const { currentPage } = this.state;
    const Page = pagesMap[currentPage];
    return (
      <div className="App">
        <Page onChangePage={this.changeCurrentPage}></Page>
      </div>
    );
  }
}

export default App;
