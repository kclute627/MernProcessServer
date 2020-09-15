import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/home/Home";
import Navbar from "./components/layout/Navbar";
import Register from "./components/Auth/Register";
import Dashboard from "./components/Dashboard/Dashboard";
import Login from "./components/Auth/Login";
import MyListings from './components/Dashboard/MyListings';
import { loadUser } from "./actions/auth";
import {LOGOUT} from './actions/types';


//redux
import { Provider} from "react-redux";
import store from "./store";
import setAuthToken from './utils/setAuthToken'
import Postjob from "./components/Dashboard/Postjob";
import FavServer from "./components/Dashboard/FavServer";
import AddListing from "./components/Dashboard/AddListing";


const App = () => {

  useEffect(() => {
    // check for token in LS and load user
    if (localStorage.token) {
      console.log('LOCAL STORAGE HIT')
      setAuthToken(localStorage.token);
       
    }
   store.dispatch(loadUser());


   
  
  
  }, [localStorage.token])


  return (
    <Provider store={store}>
      <Router>
        <div className='App'>
          <Route exact path='/' component={Home} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/register' component={Register} />
          <Route exact path='/dashboard' component={Dashboard}/>
          <Route exact path ='/dashboard/mylistings' component={MyListings}/>
          <Route exact path ='/dashboard/postjob' component={Postjob}/>
          <Route exact path ='/dashboard/favserver' component={FavServer}/>
          <Route exact path ='/dashboard/addlisting' component={AddListing}/>
          

        </div>
      </Router>
    </Provider>
  );
};

export default App;
