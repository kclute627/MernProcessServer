import axios from 'axios';

import {ADD_LISTING, SET_ALERT, CLEAR_PROFILE, LISTING_FAIL, USER_LISTINGS} from './types';


export const addListing = ({address, name, company, email, logo, services, lat, lng, author}) => async (dispatch) => {

    const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const body = JSON.stringify({ name, email, address, company, logo, services, lat, lng, author  });

      try {

        const res = await axios.post("/api/listing", body, config); 

        console.log(res.data, 'add Listing!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')

        dispatch({
            type: ADD_LISTING,
            payload: {msg: res.data.msg, alertType: 'success' },
          })
          
      } catch (error) {
        dispatch({
          type: LISTING_FAIL,
          payload: {msg: error.message, alertType: 'error' },
        })

        console.error(error, 'client actions')
          
      }

}

export const clearProfile = () => dispatch => {
  dispatch({
    type: CLEAR_PROFILE
  } )
}


export const getUserListings = ({id}) => dispatch => {

  //pass the userId to the axios request???

  try {

    const res = await axios.get("/api/listing/"); 
    
  } catch (error) {
    
  }


}