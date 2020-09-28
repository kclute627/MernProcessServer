import React, { useEffect, Fragment } from "react";
import Navbar from "../layout/Navbar";
import { connect } from "react-redux";
import { getUserListings } from "../../actions/profile";
import ClipLoader from "react-spinners/ClipLoader";

const MyListings = ({ getUserListings, listings, user, loading }) => {
  if (!listings) {
    getUserListings(user._id);
  }

  return (
    <div className='mylisting'>
      {loading ? (
        <ClipLoader />
      ) : (
        <Fragment>
          <Navbar />
          <div className='mylisting__container'>
            {!loading &&
              listings.map((cur) => {
                return (
                  <div className='listing__box'>
                    <div className=''>
                      {" "}
                      {cur.photo[0] && (
                       
                          <img className='listing__box-logo' src={`${cur.photo[0].prefix}${cur.photo[0].data}`} />
                         
                       
                      )}
                    </div>
                    <div className=''>{cur.location.address}</div>
                  </div>
                );
              })}
          </div>{" "}
        </Fragment>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  listings: state.profile.listings.listing,
  loading: state.profile.loading,
  user: state.auth.user,
});

export default connect(mapStateToProps, { getUserListings })(MyListings);
