import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/home/Home";
import Navbar from "./components/layout/Navbar";
import Register from "./components/Auth/Register";
import Login from "./components/Auth/Login";
import { loadUser } from "./actions/auth";

//redux
import { Provider } from "react-redux";
import store from "./store";
import setAuthToken from './utils/setAuthToken'

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {

  useEffect(()=> {
    store.dispatch(loadUser())
  }, [])
  return (
    <Provider store={store}>
      <Router>
        <div className='App'>
          <Route exact path='/' component={Home} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/register' component={Register} />
        </div>
      </Router>
    </Provider>
  );
};

export default App;
