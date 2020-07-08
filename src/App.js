import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Navbar from "./components/navbar.component";
import UsersList from "./components/users-list.component";
import Addpersonalinformation from "./components/add-personal-information.component";
import CreateUser from "./components/create-user.component";
import Editinfo from "./components/edit-exercise.component";
import About from "./components/about.component";

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <br />
        <Route path="/" exact component={UsersList} />
        <Route path="/edit/:id" component={Editinfo} />
        <Route path="/create" component={Addpersonalinformation} />
        <Route path="/user" component={CreateUser} />
        <Route path="/about" component={About} />
      </div>
    </Router>
  );
}

export default App;
