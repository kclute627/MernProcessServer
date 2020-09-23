import axios from 'axios';

import {ADD_LISTING} from './types';


export const addListing = ({address, name, company, email, logo, services, lat, lng, author}) => async (dispatch) => {

    const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const body = JSON.stringify({ name, email, address, company, logo, services, lat, lng, author  });

      try {

        const res = await axios.post("/api/listing", body, config); 

        console.log(res.data)

        dispatch({
            type: ADD_LISTING,
            payload: res.data,
          })
          
      } catch (error) {

        console.error(error)
          
      }

}