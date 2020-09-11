import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/home/Home";
import Navbar from "./components/layout/Navbar";
import Register from "./components/Auth/Register";
import Dashboard from "./components/Dashboard/Dashboard";
import Login from "./components/Auth/Login";
import { loadUser } from "./actions/auth";

//redux
import { Provider} from "react-redux";
import store from "./store";
import setAuthToken from './utils/setAuthToken'



const App = () => {

  useEffect(() => {
    // check for token in LS and load user
    if (localStorage.token) {
      setAuthToken(localStorage.token);
      store.dispatch(loadUser());
    }})


  return (
    <Provider store={store}>
      <Router>
        <div className='App'>
          <Route exact path='/' component={Home} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/register' component={Register} />
          <Route exact path='/dashboard' component={Dashboard}/>
        </div>
      </Router>
    </Provider>
  );
};

export default App;
