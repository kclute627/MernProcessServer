import React, { Fragment } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/home/Home";
import Navbar from "./components/layout/Navbar";
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';

const App = () => {
  return (
    <Router>
      <Fragment className="App">
        <Route exact path='/' component={Home} />
        <Route exact path='/login' component={Login}/>
        <Route exact path= '/register' component={Register}/>
        
        
      </Fragment>
    </Router>
  );
};

export default App;
