import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getUserListings } from "../../actions/profile";

const MyListings = ({ getUserListings, listings, user, loading}) => {
  useEffect(() => {
    getUserListings(user._id);
  }, []);

  return (
    <div className="mylisting">
      <div className="mylisting__container">
        { !loading && listings.map((cur) => {
          return (
            <div className="listing__box">            

              <div className="">{cur.location.address}</div>
             
            </div>
          );
        })}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  listings: state.profile.listings.listing,
  loading: state.profile.loading,
  user: state.auth.user
});

export default connect(mapStateToProps, { getUserListings })(MyListings);
