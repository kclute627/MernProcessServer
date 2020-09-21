import axios from 'axios';

import ADD_LISTING from './types';


export const addListing = ({address, name, company, email, logo, services, lat, lng}) => async (dispatch) => {

    const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const body = JSON.stringify({ name, email, address, company, logo, services, lat, lng  });

      try {

        const res = await axios.post("/api/users/addlisting", body, config);

        dispatch({
            type: ADD_LISTING,
            payload: res.data,
          })
          
      } catch (error) {
          
      }

}