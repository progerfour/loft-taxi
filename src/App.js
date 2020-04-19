import React, { useContext, useState } from "react";

import "./App.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Map from "./pages/Map";
import Profile from "./pages/Profile";
import { AuthContext } from "./context/authContext";

const pagesMap = {
  map: Map,
  profile: Profile,
  exit: Login,
  login: Login,
  register: Register,
};

const App = () => {
  const {isLoggedIn} = useContext(AuthContext);
  const [currentPage, setCurrentPage] = useState("login");
  const ComponentPage = pagesMap[ 
    isLoggedIn
    ?  (currentPage ===  "register" || currentPage ===  "login") ? "map" : currentPage 
    :  (currentPage === "register") ? "register" : "login"
  ];

  return (
    <div className="App">
      <ComponentPage onChangePage={setCurrentPage}></ComponentPage>
    </div>
  );
};

export default App;
