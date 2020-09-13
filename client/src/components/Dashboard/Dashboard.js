import React, { useEffect } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { connect } from "react-redux";
import queryString from "query-string";
import { registerGoogle, loadUser } from "../../actions/auth";
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
      <div className="dashboard__i">
          Dashboard Welcome {user && user.name}
      </div>
  )

  return (
    <div className="dashboard">
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
