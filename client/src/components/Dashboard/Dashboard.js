import React, { useEffect } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { connect } from "react-redux";
import queryString from "query-string";
import { registerGoogle, loadUser } from "../../actions/auth";
import Button from "@material-ui/core/Button";
import Navbar from '../layout/Navbar';
import PropTypes from "prop-types";

const Dashboard = ({ registerGoogle, user, loading, loadUser, token }) => {
  useEffect((props) => {
    let query = queryString.parse(window.location.search);
    console.log(query);
    if (query.token) {
      registerGoogle(query.token);
      

    }
    
  }, [registerGoogle]);

 
  const dashboard = (
      <div className="dashboard__middle">
        <div className="dashboard__middle-1">
           Welcome {user && user.name}
        </div>
        <div className="dashboard__middle-2">
          <Button
           id='dashboard__button'
           variant='outlined'
           color='primary'
           type='submit'
           placeholder='submit'
          >Add A Listing</Button>
        </div>
        <div className="dashboard__middle-2 ">
          <Button
           id='dashboard__button'
           variant='outlined'
           color='primary'
           type='submit'
           placeholder='submit'
          >My Listings</Button>
        </div>
        <div className="dashboard__middle-2">
          <Button
           id='dashboard__button'
           variant='outlined'
           color='primary'
           type='submit'
           placeholder='submit'
          >Favorite Servers</Button>
        </div>
        <div className="dashboard__middle-2">
          <Button
          id='dashboard__button'
          variant='outlined'
          color='primary'
          type='submit'
          placeholder='submit'>Post A Job</Button>
        </div>



          
      </div>
  )

  return (
    <div className="dashboard">
      <div className="dashboard__top">
        <Navbar/>
      </div>
        {loading ? <ClipLoader/> : dashboard }
         
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  loading: state.auth.loading,
  token: state.auth.token
});

export default connect(mapStateToProps, { registerGoogle, loadUser })(Dashboard);
